import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Wind, Ruler, AlertCircle, Info, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { 
  HVACInputs, 
  HVACResults, 
  calculateHVACResults, 
  validateHVACInputs,
  calculateDiameterFromVelocity,
  calculateDiameterFromFriction
} from "@/lib/hvac-calculations";

export default function HVACCalculator() {
  const [inputs, setInputs] = useState<HVACInputs>({
    velocity: 1500,
    friction: 0.1,
    cfm: 1000
  });

  const [results, setResults] = useState<HVACResults | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

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
      case 'cfm':
        isValid = value >= 100 && value <= 55100;
        break;
    }
    
    return `pr-16 ${isValid ? 'border-green-500' : value > 0 ? 'border-red-500' : ''}`;
  };

  // Generate CFM options: 100, 600, 1100, 1600, etc. up to 55100
  const cfmOptions: number[] = [];
  for (let cfm = 100; cfm <= 55100; cfm += 500) {
    cfmOptions.push(cfm);
  }

  // Generate chart data for all CFM values using current velocity and friction
  const generateChartData = () => {
    const chartData: Array<{
      cfm: number, 
      velocityBased: number, 
      frictionBased: number,
      isCurrentPoint?: boolean,
      currentVelocity?: number,
      currentFriction?: number
    }> = [];
    
    // Sample every 8th value for better chart readability across full range
    const sampleCfmValues = cfmOptions.filter((_, index) => index % 8 === 0);
    
    sampleCfmValues.forEach(cfm => {
      const velocityDiameter = calculateDiameterFromVelocity(inputs.velocity, cfm);
      const frictionDiameter = calculateDiameterFromFriction(inputs.friction, cfm);
      
      // Check if this is the current selected CFM point
      const isCurrentPoint = cfm === inputs.cfm;
      
      chartData.push({
        cfm,
        velocityBased: velocityDiameter,
        frictionBased: frictionDiameter,
        isCurrentPoint,
        currentVelocity: isCurrentPoint ? inputs.velocity : undefined,
        currentFriction: isCurrentPoint ? inputs.friction : undefined
      });
    });
    
    // Ensure the current CFM point is included even if not in sample
    const currentCfmInChart = chartData.find(point => point.cfm === inputs.cfm);
    if (!currentCfmInChart) {
      const velocityDiameter = calculateDiameterFromVelocity(inputs.velocity, inputs.cfm);
      const frictionDiameter = calculateDiameterFromFriction(inputs.friction, inputs.cfm);
      
      chartData.push({
        cfm: inputs.cfm,
        velocityBased: velocityDiameter,
        frictionBased: frictionDiameter,
        isCurrentPoint: true,
        currentVelocity: inputs.velocity,
        currentFriction: inputs.friction
      });
      
      // Sort by CFM to maintain order
      chartData.sort((a, b) => a.cfm - b.cfm);
    }
    
    return chartData;
  };

  const chartData = generateChartData();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <i className="fas fa-sliders-h text-primary text-xl"></i>
              <span>Input Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Velocity Input */}
            <div className="space-y-2">
              <Label htmlFor="velocity">Air Velocity</Label>
              <div className="relative">
                <Input
                  id="velocity"
                  type="number"
                  placeholder="1500"
                  value={inputs.velocity || ''}
                  onChange={(e) => updateInput('velocity', Number(e.target.value))}
                  className={getInputBorderClass('velocity', inputs.velocity)}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  ft/min
                </span>
              </div>
              <p className="text-xs text-gray-500">Range: 100 - 5,000 ft/min</p>
            </div>

            {/* Friction Input */}
            <div className="space-y-2">
              <Label htmlFor="friction">Friction Loss</Label>
              <div className="relative">
                <Input
                  id="friction"
                  type="number"
                  step="0.01"
                  placeholder="0.1"
                  value={inputs.friction || ''}
                  onChange={(e) => updateInput('friction', Number(e.target.value))}
                  className={getInputBorderClass('friction', inputs.friction)}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  in./100ft
                </span>
              </div>
              <p className="text-xs text-gray-500">Range: 0.01 - 1.0 in./100ft</p>
            </div>

            {/* CFM Selection */}
            <div className="space-y-2">
              <Label htmlFor="cfm">Air Flow Rate (CFM)</Label>
              <Select 
                value={inputs.cfm.toString()} 
                onValueChange={(value) => updateInput('cfm', Number(value))}
              >
                <SelectTrigger className={getInputBorderClass('cfm', inputs.cfm)}>
                  <SelectValue placeholder="Select CFM" />
                </SelectTrigger>
                <SelectContent>
                  {cfmOptions.map((cfm) => (
                    <SelectItem key={cfm} value={cfm.toString()}>
                      {cfm.toLocaleString()} CFM
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Select from 100 to 55,100 CFM (100, 600, 1100, 1600...)</p>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Auto-calculation info */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-sm text-blue-700 flex items-center">
                <Calculator className="mr-2 h-4 w-4" />
                Results update automatically as you change inputs
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Calculation Results */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Ruler className="text-green-600 h-5 w-5" />
                  <span>Duct Diameter Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-600 mb-1">Velocity-Based Diameter</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {results.diameterVelocity}"
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Based on {inputs.velocity} ft/min velocity
                      </p>
                    </div>
                    
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <p className="text-sm text-orange-600 mb-1">Friction-Based Diameter</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {results.diameterFriction}"
                      </p>
                      <p className="text-xs text-orange-600 mt-1">
                        Based on {inputs.friction} in./100ft friction
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Calculation Timestamp</p>
                    <p className="font-medium">{results.timestamp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <BarChart3 className="text-purple-600 h-5 w-5" />
            <span>Round Duct Size Comparison</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="cfm" 
                  label={{ value: 'CFM', position: 'insideBottom', offset: -5 }}
                  domain={[0, 55100]}
                />
                <YAxis 
                  label={{ value: 'Duct dia. in inches', angle: -90, position: 'outside', offset: -10 }}
                  domain={[0, 60]}
                />
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => {
                    const point = props.payload;
                    if (point?.isCurrentPoint) {
                      return [
                        `${value}" (Current Selection)`,
                        name === 'velocityBased' 
                          ? `Velocity: ${point.currentVelocity} ft/min` 
                          : `Friction: ${point.currentFriction} in./100ft`
                      ];
                    }
                    return [
                      `${value}"`, 
                      name === 'velocityBased' ? 'Velocity based diameter' : 'Friction based diameter'
                    ];
                  }}
                  labelFormatter={(label: any) => `CFM: ${label}`}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value: any) => 
                    value === 'velocityBased' 
                      ? 'Velocity based duct diameter (inches)' 
                      : 'Friction based duct diameter (inches)'
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="velocityBased" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { payload } = props;
                    return payload?.isCurrentPoint ? (
                      <circle 
                        cx={props.cx} 
                        cy={props.cy} 
                        r={6} 
                        fill="#1d4ed8" 
                        stroke="#ffffff" 
                        strokeWidth={3}
                      />
                    ) : (
                      <circle 
                        cx={props.cx} 
                        cy={props.cy} 
                        r={2} 
                        fill="#3b82f6" 
                      />
                    );
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="frictionBased" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { payload } = props;
                    return payload?.isCurrentPoint ? (
                      <circle 
                        cx={props.cx} 
                        cy={props.cy} 
                        r={6} 
                        fill="#c2410c" 
                        stroke="#ffffff" 
                        strokeWidth={3}
                      />
                    ) : (
                      <circle 
                        cx={props.cx} 
                        cy={props.cy} 
                        r={2} 
                        fill="#f97316" 
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Chart shows diameter calculations for full CFM range using current velocity ({inputs.velocity} ft/min) and friction ({inputs.friction} in./100ft) values. Highlighted points show your current selection.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}