import { useState, useCallback, useEffect } from "react";
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
  
  const [results, setResults] = useState<HVACResults>({
    cfm: 0,
    diameterVelocity: 0,
    diameterFriction: 0,
    timestamp: ""
  });
  
  const [errors, setErrors] = useState<string[]>([]);

  const calculateResults = useCallback(() => {
    const validationErrors = validateHVACInputs(inputs);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      const newResults = calculateHVACResults(inputs);
      setResults(newResults);
    }
  }, [inputs]);

  // Real-time calculation on input change
  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const handleInputChange = (field: keyof HVACInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const getInputClassName = (field: keyof HVACInputs) => {
    const value = inputs[field];
    let isValid = true;
    
    switch (field) {
      case 'velocity':
        isValid = value >= 100 && value <= 5000;
        break;
      case 'friction':
        isValid = value >= 0.01 && value <= 1.0;
        break;
      case 'cfm':
        isValid = value >= 100 && value <= 100000;
        break;
    }
    
    return `pr-16 ${isValid ? 'border-green-500' : value > 0 ? 'border-red-500' : ''}`;
  };

  // Generate CFM options: 100, 600, 1100, 1600, etc. up to 100000
  const cfmOptions: number[] = [];
  for (let cfm = 100; cfm <= 100000; cfm += 500) {
    cfmOptions.push(cfm);
  }

  // Generate chart data for all CFM values using current velocity and friction
  const generateChartData = () => {
    const chartData: Array<{cfm: number, velocityBased: number, frictionBased: number}> = [];
    const sampleCfmValues = cfmOptions.filter((_, index) => index % 4 === 0); // Sample every 4th value for better chart readability
    
    sampleCfmValues.forEach(cfm => {
      if (cfm <= 8000) { // Limit chart to reasonable CFM range for visibility
        const velocityDiameter = calculateDiameterFromVelocity(inputs.velocity, cfm);
        const frictionDiameter = calculateDiameterFromFriction(inputs.friction, cfm);
        
        chartData.push({
          cfm,
          velocityBased: velocityDiameter,
          frictionBased: frictionDiameter
        });
      }
    });
    
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
                value={inputs.velocity || ""}
                onChange={(e) => handleInputChange('velocity', e.target.value)}
                placeholder="Enter velocity"
                min="0"
                step="1"
                className={getInputClassName('velocity')}
              />
              <span className="absolute right-3 top-3 text-gray-500 text-sm font-medium">ft/min</span>
            </div>
            <p className="text-xs text-gray-500">Typical range: 500-4000 ft/min</p>
          </div>

          {/* Friction Input */}
          <div className="space-y-2">
            <Label htmlFor="friction">Friction Loss</Label>
            <div className="relative">
              <Input
                id="friction"
                type="number"
                value={inputs.friction || ""}
                onChange={(e) => handleInputChange('friction', e.target.value)}
                placeholder="Enter friction loss"
                min="0"
                step="0.01"
                className={getInputClassName('friction')}
              />
              <span className="absolute right-3 top-3 text-gray-500 text-sm font-medium">in./100ft</span>
            </div>
            <p className="text-xs text-gray-500">Typical range: 0.05-0.15 in./100ft</p>
          </div>

          {/* CFM Selection */}
          <div className="space-y-2">
            <Label htmlFor="cfm">Air Flow Rate (CFM)</Label>
            <Select 
              value={inputs.cfm.toString()} 
              onValueChange={(value) => handleInputChange('cfm', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select CFM" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {cfmOptions.map((cfm) => (
                  <SelectItem key={cfm} value={cfm.toString()}>
                    {cfm.toLocaleString()} CFM
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Select from 100 to 100,000 CFM (100, 600, 1100, 1600...)</p>
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

          {/* Calculate Button */}
          <Button 
            onClick={calculateResults}
            className="w-full bg-primary hover:bg-blue-700 text-white"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Results
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Selected CFM Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wind className="text-orange-500 h-5 w-5" />
                <span>Selected Air Flow Rate</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-primary">
                User Selection
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Selected CFM Value</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(results.cfm || 0).toLocaleString()} <span className="text-lg font-medium text-gray-500">CFM</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                This CFM value is used for diameter calculations
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Diameter Based on Velocity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Ruler className="text-green-600 h-5 w-5" />
                <span>Diameter (Velocity)</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-600">
                CFM + Velocity
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Required Duct Diameter</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(results.diameterVelocity || 0).toFixed(0)} <span className="text-lg font-medium text-gray-500">inches</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Based on selected CFM and velocity
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Diameter Based on Friction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Ruler className="text-red-600 h-5 w-5" />
                <span>Diameter (Friction)</span>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-600">
                CFM + Friction
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Required Duct Diameter</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(results.diameterFriction || 0).toFixed(0)} <span className="text-lg font-medium text-gray-500">inches</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Based on selected CFM and friction loss
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Calculation Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <i className="fas fa-chart-line mr-2 text-primary"></i>
              Calculation Summary
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Input Velocity:</p>
                <p className="font-medium">{inputs.velocity} ft/min</p>
              </div>
              <div>
                <p className="text-gray-600">Input Friction:</p>
                <p className="font-medium">{inputs.friction} in./100ft</p>
              </div>
              <div>
                <p className="text-gray-600">Selected CFM:</p>
                <p className="font-medium">{(results.cfm || 0).toLocaleString()} CFM</p>
              </div>
              <div>
                <p className="text-gray-600">Calculation Time:</p>
                <p className="font-medium">{results.timestamp}</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                />
                <YAxis 
                  label={{ value: 'Duct dia. in inches', angle: -90, position: 'insideLeft' }}
                  domain={[0, 30]}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}"`, 
                    name === 'velocityBased' ? 'Velocity based duct diameter (inches)' : 'Friction based duct diameter (inches)'
                  ]}
                  labelFormatter={(label) => `CFM: ${label}`}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => 
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
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="frictionBased" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ fill: '#f97316', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Chart shows diameter calculations for CFM range up to 8,000 using current velocity ({inputs.velocity} ft/min) and friction ({inputs.friction} in./100ft) values
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
