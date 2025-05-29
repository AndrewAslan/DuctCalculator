import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Wind, Ruler, AlertCircle, Info } from "lucide-react";
import { 
  HVACInputs, 
  HVACResults, 
  calculateHVACResults, 
  validateHVACInputs 
} from "@/lib/hvac-calculations";

export default function HVACCalculator() {
  const [inputs, setInputs] = useState<HVACInputs>({
    velocity: 1500,
    friction: 0.1
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
    }
    
    return `pr-16 ${isValid ? 'border-green-500' : value > 0 ? 'border-red-500' : ''}`;
  };

  return (
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
        {/* CFM Result */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wind className="text-orange-500 h-5 w-5" />
                <span>Air Flow Rate (CFM)</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-primary">
                Based on Velocity & Diameter
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Calculated Air Flow</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(results.cfm || 0).toFixed(0)} <span className="text-lg font-medium text-gray-500">CFM</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Calculated using velocity and calculated diameter
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
                  {(results.diameterVelocity || 0).toFixed(1)} <span className="text-lg font-medium text-gray-500">inches</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Based on desired CFM and velocity
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
                  {(results.diameterFriction || 0).toFixed(1)} <span className="text-lg font-medium text-gray-500">inches</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Based on desired CFM and friction loss
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
                <p className="text-gray-600">Calculated CFM:</p>
                <p className="font-medium">{(results.cfm || 0).toFixed(0)} CFM</p>
              </div>
              <div>
                <p className="text-gray-600">Calculation Time:</p>
                <p className="font-medium">{results.timestamp}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
