import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Wind, Ruler } from "lucide-react";
import { calculateCFMFromVelocity, calculateCFMFromFriction } from "@/lib/hvac-calculations";

export default function HVACCalculator() {
  const [velocityLimit, setVelocityLimit] = useState<number>(2500);
  const [frictionLimit, setFrictionLimit] = useState<number>(0.15);
  const [calculationType, setCalculationType] = useState<'velocity' | 'friction'>('velocity');

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
      const velocityCFM = calculateCFMFromVelocity(velocityLimit, diameter);
      const frictionCFM = calculateCFMFromFriction(frictionLimit, diameter);
      return {
        diameter,
        velocityCFM: Math.round(velocityCFM),
        frictionCFM: Math.round(frictionCFM)
      };
    });
  }, [ductDiameters, velocityLimit, frictionLimit]);

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
          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                className="text-center"
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
                className="text-center"
              />
            </div>

            <div className="space-y-2">
              <Label>Calculation Type</Label>
              <div className="flex gap-2">
                <Button
                  variant={calculationType === 'velocity' ? 'default' : 'outline'}
                  onClick={() => setCalculationType('velocity')}
                  className="flex-1"
                >
                  Velocity
                </Button>
                <Button
                  variant={calculationType === 'friction' ? 'default' : 'outline'}
                  onClick={() => setCalculationType('friction')}
                  className="flex-1"
                >
                  Friction
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Results Table */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-sm">
                {calculationType === 'velocity' 
                  ? `Velocity-based CFM (${velocityLimit} FPM limit)`
                  : `Friction-based CFM (${frictionLimit} in w.g./100 ft limit)`
                }
              </Badge>
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
                      CFM
                    </TableCell>
                    {cfmCalculations.map(calc => (
                      <TableCell key={calc.diameter} className="text-center font-mono">
                        {calculationType === 'velocity' 
                          ? calc.velocityCFM.toLocaleString()
                          : calc.frictionCFM.toLocaleString()
                        }
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
                <div>Showing: {calculationType === 'velocity' ? 'Velocity' : 'Friction'}-based calculations</div>
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