import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Wind, Ruler, Download, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';
import { calculateCFMFromVelocity, calculateCFMFromFriction } from "@/lib/hvac-calculations";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function HVACCalculator() {
  const [velocityLimit, setVelocityLimit] = useState<number>(2500);
  const [frictionLimit, setFrictionLimit] = useState<number>(0.15);
  
  // Project information state
  const [projectName, setProjectName] = useState<string>('');
  const [engineerName, setEngineerName] = useState<string>('');
  const [projectDate, setProjectDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [jobNumber, setJobNumber] = useState<string>('');

  // Generate duct diameters from 4 to 60 in increments of 2
  const ductDiameters = useMemo(() => {
    const diameters = [];
    for (let diameter = 4; diameter <= 60; diameter += 2) {
      diameters.push(diameter);
    }
    return diameters;
  }, []);

  // Calculate CFM values for each diameter
  const cfmCalculations = useMemo(() => {
    return ductDiameters.map(diameter => {
      const rawVelocityCFM = calculateCFMFromVelocity(velocityLimit, diameter);
      const frictionCFM = calculateCFMFromFriction(frictionLimit, diameter);
      
      // Adjust velocity CFM: subtract 0.007% or minimum 1 CFM (whichever is larger)
      const adjustmentPercent = rawVelocityCFM * 0.00007; // 0.007% in decimal form
      const adjustment = adjustmentPercent > 1 ? adjustmentPercent : 1;
      const adjustedVelocityCFM = rawVelocityCFM - adjustment;
      
      return {
        diameter,
        velocityCFM: Math.round(Math.max(0, adjustedVelocityCFM)), // Ensure no negative values
        frictionCFM: Math.round(Math.max(0, frictionCFM))  // Ensure no negative values
      };
    });
  }, [ductDiameters, velocityLimit, frictionLimit]);

  // Prepare chart data
  const chartData = useMemo(() => {
    return cfmCalculations.map(calc => ({
      diameter: calc.diameter,
      "Velocity CFM": calc.velocityCFM,
      "Friction CFM": calc.frictionCFM
    }));
  }, [cfmCalculations]);

  // Find intersection points where velocity and friction CFM lines cross
  const intersectionPoints = useMemo(() => {
    const intersections: Array<{ diameter: number; cfm: number }> = [];
    for (let i = 0; i < cfmCalculations.length - 1; i++) {
      const current = cfmCalculations[i];
      const next = cfmCalculations[i + 1];
      
      // Check if lines cross between these two points
      const velocityDiff1 = current.velocityCFM - current.frictionCFM;
      const velocityDiff2 = next.velocityCFM - next.frictionCFM;
      
      if (velocityDiff1 * velocityDiff2 < 0) { // Sign change indicates crossing
        // Interpolate intersection point
        const ratio = Math.abs(velocityDiff1) / (Math.abs(velocityDiff1) + Math.abs(velocityDiff2));
        const intersectionDiameter = current.diameter + (next.diameter - current.diameter) * ratio;
        const intersectionCFM = current.velocityCFM + (next.velocityCFM - current.velocityCFM) * ratio;
        
        intersections.push({
          diameter: Math.round(intersectionDiameter * 10) / 10,
          cfm: Math.round(intersectionCFM)
        });
      }
    }
    return intersections;
  }, [cfmCalculations]);

  // Validate input values
  const isValidVelocity = velocityLimit > 0 && velocityLimit <= 5000;
  const isValidFriction = frictionLimit > 0 && frictionLimit <= 1.0;

  // Export table data to PDF
  const exportToPDF = () => {
    if (!isValidVelocity || !isValidFriction) {
      alert('Please enter valid velocity (1-5000 FPM) and friction (0.01-1.0) values before exporting.');
      return;
    }
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      
      // Header with company logo space
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, pageWidth, 25, 'F');
      
      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('HVAC DUCTWORK CFM CALCULATOR REPORT', pageWidth / 2, 16, { align: 'center' } as any);
      
      // Company logo placeholder
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('Company Logo Space', 15, 8);
      doc.rect(10, 3, 50, 15);
      
      // Project information section
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Project Information', 20, 40);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Project Name: ${projectName || '________________________________'}`, 20, 50);
      doc.text(`Engineer: ${engineerName || '____________________________________'}`, 20, 58);
      doc.text(`Date: ${projectDate || '________________________________________'}`, 20, 66);
      doc.text(`Job Number: ${jobNumber || '__________________________________'}`, 20, 74);
      
      // Calculation parameters
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Calculation Parameters', 20, 90);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Velocity Limit: ${velocityLimit} FPM`, 20, 100);
      doc.text(`Friction Limit: ${frictionLimit} in w.g./100 ft`, 20, 108);
      doc.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, 116);
      doc.text(`Velocity CFM Adjustment: -0.007% or minimum 1 CFM (whichever is larger)`, 20, 124);
      
      // Intersection points summary
      if (intersectionPoints.length > 0) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Intersection Points (Equal CFM)', 20, 140);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        intersectionPoints.forEach((intersection, index) => {
          doc.text(`• At ${intersection.diameter}" diameter: ${intersection.cfm.toLocaleString()} CFM`, 25, 148 + (index * 8));
        });
      }
      
      // CFM table
      const tableStartY = intersectionPoints.length > 0 ? 170 : 150;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('CFM Calculations by Duct Diameter', 20, tableStartY - 5);
      
      // Prepare table data
      const tableHeaders = ['Diameter\n(inches)', 'Velocity CFM\n(Adjusted)', 'Friction CFM\n(Standard)', 'Difference\n(CFM)'];
      const tableData = cfmCalculations.map(calc => {
        const difference = Math.abs(calc.velocityCFM - calc.frictionCFM);
        return [
          `${calc.diameter}"`,
          calc.velocityCFM.toLocaleString(),
          calc.frictionCFM.toLocaleString(),
          difference.toLocaleString()
        ];
      });
      
      // Generate enhanced table
      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
        startY: tableStartY,
        styles: {
          fontSize: 8,
          cellPadding: 2,
          lineWidth: 0.1,
          lineColor: [128, 128, 128]
        },
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center'
        },
        bodyStyles: {
          halign: 'center'
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        },
        columnStyles: {
          0: { cellWidth: 35 },
          1: { cellWidth: 45 },
          2: { cellWidth: 45 },
          3: { cellWidth: 35 }
        }
      });
      
      // Footer
      const finalY = (doc as any).lastAutoTable?.finalY || tableStartY + 100;
      if (finalY < pageHeight - 40) {
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('This report was generated by HVAC Ductwork CFM Calculator', pageWidth / 2, pageHeight - 20, { align: 'center' } as any);
        doc.text('Calculations based on standard ASHRAE formulas', pageWidth / 2, pageHeight - 15, { align: 'center' } as any);
        doc.text('Note: Velocity CFM values include 0.007% reduction for practical sizing', pageWidth / 2, pageHeight - 10, { align: 'center' } as any);
      }
      
      // Save with descriptive filename
      const timestamp = new Date().toISOString().split('T')[0];
      doc.save(`HVAC_CFM_Calculator_Report_${timestamp}.pdf`);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            HVAC Ductwork CFM Calculator
          </CardTitle>
          <CardDescription>
            Enter velocity and friction limits to see CFM calculations for all duct diameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Project Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="engineer-name">Engineer</Label>
                <Input
                  id="engineer-name"
                  type="text"
                  value={engineerName}
                  onChange={(e) => setEngineerName(e.target.value)}
                  placeholder="Enter engineer name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-date">Date</Label>
                <Input
                  id="project-date"
                  type="date"
                  value={projectDate}
                  onChange={(e) => setProjectDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-number">Job Number</Label>
                <Input
                  id="job-number"
                  type="text"
                  value={jobNumber}
                  onChange={(e) => setJobNumber(e.target.value)}
                  placeholder="Enter job number"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="velocity-limit" className="flex items-center gap-2">
                <Wind className="h-4 w-4" />
                Velocity Limit (FPM)
              </Label>
              <Input
                id="velocity-limit"
                type="number"
                value={velocityLimit}
                onChange={(e) => setVelocityLimit(Number(e.target.value))}
                min="100"
                max="5000"
                step="50"
                className={`text-center ${!isValidVelocity ? 'border-red-500' : ''}`}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="friction-limit" className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Friction Limit (in w.g./100 ft)
              </Label>
              <Input
                id="friction-limit"
                type="number"
                value={frictionLimit}
                onChange={(e) => setFrictionLimit(Number(e.target.value))}
                min="0.01"
                max="1.0"
                step="0.01"
                className={`text-center ${!isValidFriction ? 'border-red-500' : ''}`}
              />
            </div>


          </div>

          <Separator />

          {/* CFM Chart */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5" />
              <h3 className="text-lg font-semibold">CFM vs Duct Diameter</h3>
            </div>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 100, bottom: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="diameter" 
                    label={{ 
                      value: 'Duct Diameter (inches)', 
                      position: 'insideBottom', 
                      offset: -40,
                      dx: -30
                    }}
                    tick={{ dy: 15 }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <YAxis 
                    label={{ 
                      value: 'CFM', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' },
                      offset: -50
                    }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [Number(value).toLocaleString(), name]}
                    labelFormatter={(label) => `${label}" Diameter`}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const intersection = intersectionPoints.find(
                          int => Math.abs(int.diameter - Number(label)) < 1
                        );
                        return (
                          <div className="bg-white p-3 border rounded shadow-lg">
                            <p className="font-medium">{`${label}" Diameter`}</p>
                            {payload.map((entry, index) => (
                              <p key={index} style={{ color: entry.color }}>
                                {`${entry.name}: ${Number(entry.value).toLocaleString()}`}
                              </p>
                            ))}
                            {intersection && (
                              <p className="font-medium text-green-600 mt-2">
                                ⚬ Intersection: {intersection.cfm.toLocaleString()} CFM
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '50px', paddingBottom: '20px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="Velocity CFM" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Friction CFM" 
                    stroke="#dc2626" 
                    strokeWidth={2}
                    dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                  />
                  {/* Mark intersection points */}
                  {intersectionPoints.map((intersection, index) => (
                    <ReferenceDot
                      key={`intersection-${index}`}
                      x={intersection.diameter}
                      y={intersection.cfm}
                      r={8}
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth={3}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Display intersection information */}
            {intersectionPoints.length > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-800">Intersection Points</span>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  {intersectionPoints.map((intersection, index) => (
                    <div key={index}>
                      At {intersection.diameter}" diameter: {intersection.cfm.toLocaleString()} CFM
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Results Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-sm">
                  Velocity: {velocityLimit} FPM
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Friction: {frictionLimit} in w.g./100 ft
                </Badge>
              </div>
              <Button onClick={exportToPDF} variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center font-semibold">
                      Duct Diameter (inches)
                    </TableHead>
                    {ductDiameters.map(diameter => (
                      <TableHead key={diameter} className="text-center min-w-[80px]">
                        {diameter}"
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold bg-muted/50">
                      Velocity CFM
                    </TableCell>
                    {cfmCalculations.map(calc => (
                      <TableCell key={calc.diameter} className="text-center font-mono">
                        {calc.velocityCFM.toLocaleString()}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-muted/50">
                      Friction CFM
                    </TableCell>
                    {cfmCalculations.map(calc => (
                      <TableCell key={calc.diameter} className="text-center font-mono">
                        {calc.frictionCFM.toLocaleString()}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Summary Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Current Settings</h4>
              <div className="space-y-1 text-sm">
                <div>Velocity Limit: {velocityLimit} FPM</div>
                <div>Friction Limit: {frictionLimit} in w.g./100 ft</div>
                <div>Showing: Both velocity and friction calculations</div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Diameter Range</h4>
              <div className="space-y-1 text-sm">
                <div>Minimum: 4 inches</div>
                <div>Maximum: 60 inches</div>
                <div>Increment: 2 inches</div>
                <div>Total options: {ductDiameters.length} sizes</div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}