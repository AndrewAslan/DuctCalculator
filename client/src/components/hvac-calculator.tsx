import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Wind, Ruler, AlertCircle, Info, Table as TableIcon } from "lucide-react";
import { 
  HVACInputs, 
  HVACResults, 
  calculateHVACResults, 
  validateHVACInputs,
  generateCFMOptions,
  generateDiameterOptions
} from "@/lib/hvac-calculations";

export default function HVACCalculator() {
  const [inputs, setInputs] = useState<HVACInputs>({
    velocity: 1500,
    friction: 0.1
  });

  const [results, setResults] = useState<HVACResults | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'velocity' | 'friction'>('velocity');

  const updateInput = (field: keyof HVACInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  // Auto-calculate results when inputs change
  useEffect(() => {
    const validationErrors = validateHVACInputs(inputs);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      const calculatedResults = calculateHVACResults(inputs);
      setResults(calculatedResults);
    } else {
      setResults(null);
    }
  }, [inputs]);

  const getInputBorderClass = (field: keyof HVACInputs, value: number) => {
    let isValid = false;
    
    switch (field) {
      case 'velocity':
        isValid = value >= 100 && value <= 5000;
        break;
      case 'friction':
        isValid = value >= 0.01 && value <= 1.0;
        break;
    }
    
    return `pr-16 ${isValid ? 'border-green-500' : value > 0 ? 'border-red-500' : ''}`;
  };

  const cfmOptions = generateCFMOptions();
  const diameterOptions = generateDiameterOptions();

  const renderVelocityTable = () => {
    if (!results) return null;

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">CFM</TableHead>
              {diameterOptions.map(diameter => (
                <TableHead key={diameter} className="text-center w-16">
                  {diameter}"
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.velocityBasedTable.slice(0, 20).map((row) => (
              <TableRow key={row.cfm}>
                <TableCell className="font-medium">{row.cfm.toLocaleString()}</TableCell>
                {diameterOptions.map(diameter => {
                  const velocityValue = row[`diameter${diameter}` as keyof typeof row] as number;
                  const isInRange = velocityValue >= inputs.velocity * 0.9 && velocityValue <= inputs.velocity * 1.1;
                  return (
                    <TableCell 
                      key={diameter} 
                      className={`text-center ${isInRange ? 'bg-blue-100 font-semibold' : ''}`}
                    >
                      {velocityValue.toLocaleString()}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderFrictionTable = () => {
    if (!results) return null;

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">CFM</TableHead>
              {diameterOptions.map(diameter => (
                <TableHead key={diameter} className="text-center w-16">
                  {diameter}"
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.frictionBasedTable.slice(0, 20).map((row) => (
              <TableRow key={row.cfm}>
                <TableCell className="font-medium">{row.cfm.toLocaleString()}</TableCell>
                {diameterOptions.map(diameter => {
                  const frictionValue = row[`diameter${diameter}` as keyof typeof row] as number;
                  const isInRange = frictionValue >= inputs.friction * 0.9 && frictionValue <= inputs.friction * 1.1;
                  return (
                    <TableCell 
                      key={diameter} 
                      className={`text-center ${isInRange ? 'bg-orange-100 font-semibold' : ''}`}
                    >
                      {frictionValue.toFixed(4)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <Calculator className="inline-block mr-3 mb-1" size={36} />
          HVAC Ductwork Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional ductwork sizing calculator for velocity and friction loss analysis. 
          Input your velocity and friction requirements to see comprehensive CFM and diameter tables.
        </p>
      </div>

      {/* Input Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            Input Parameters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="velocity" className="flex items-center gap-2">
                <Wind className="w-4 h-4" />
                Air Velocity (ft/min)
              </Label>
              <div className="relative">
                <Input
                  id="velocity"
                  type="number"
                  value={inputs.velocity}
                  onChange={(e) => updateInput('velocity', parseFloat(e.target.value) || 0)}
                  className={getInputBorderClass('velocity', inputs.velocity)}
                  min="100"
                  max="5000"
                  step="50"
                />
                <span className="absolute right-3 top-2.5 text-sm text-gray-500">
                  ft/min
                </span>
              </div>
              <p className="text-xs text-gray-500">Range: 100 - 5,000 ft/min</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="friction" className="flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Friction Loss (in./100ft)
              </Label>
              <div className="relative">
                <Input
                  id="friction"
                  type="number"
                  value={inputs.friction}
                  onChange={(e) => updateInput('friction', parseFloat(e.target.value) || 0)}
                  className={getInputBorderClass('friction', inputs.friction)}
                  min="0.01"
                  max="1.0"
                  step="0.01"
                />
                <span className="absolute right-3 top-2.5 text-sm text-gray-500">
                  in./100ft
                </span>
              </div>
              <p className="text-xs text-gray-500">Range: 0.01 - 1.0 in./100ft</p>
            </div>
          </div>

          {errors.length > 0 && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results Tables */}
      {results && (
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('velocity')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'velocity'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Wind className="w-4 h-4 inline mr-2" />
              Velocity Table (ft/min)
            </button>
            <button
              onClick={() => setActiveTab('friction')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'friction'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Ruler className="w-4 h-4 inline mr-2" />
              Friction Table (in./100ft)
            </button>
          </div>

          {/* Active Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TableIcon className="w-5 h-5" />
                {activeTab === 'velocity' ? 'Velocity Requirements' : 'Friction Loss Values'}
                <span className="text-sm font-normal text-gray-500">
                  (CFM vs Duct Diameter 4" - 60")
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {activeTab === 'velocity' 
                      ? `Highlighted cells show velocities within ±10% of your target ${inputs.velocity} ft/min`
                      : `Highlighted cells show friction values within ±10% of your target ${inputs.friction} in./100ft`
                    }
                  </AlertDescription>
                </Alert>
              </div>
              
              {activeTab === 'velocity' ? renderVelocityTable() : renderFrictionTable()}
              
              <div className="mt-4 text-sm text-gray-500">
                Showing first 20 CFM values. Duct diameters range from 4" to 60" in 2" increments.
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}