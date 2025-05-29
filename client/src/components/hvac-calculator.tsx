import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Wind, Ruler, AlertCircle, Info, BarChart3 } from "lucide-react";
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

  const calculateResults = () => {
    const validationErrors = validateHVACInputs(inputs);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      const calculatedResults = calculateHVACResults(inputs);
      setResults(calculatedResults);
    } else {
      setResults(null);
    }
  };

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
                    {(results?.cfm || inputs.cfm || 0).toLocaleString()} <span className="text-lg font-medium text-gray-500">CFM</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500 flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  This CFM value is used for diameter calculations
                </p>
              </div>
            </CardContent>
          </Card>

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

      {/* Chart Section - Coming Soon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <BarChart3 className="text-purple-600 h-5 w-5" />
            <span>Round Duct Size Comparison Chart</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart will be added shortly to show diameter comparisons across CFM range</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}