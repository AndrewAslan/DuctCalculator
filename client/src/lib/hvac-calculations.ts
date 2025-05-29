export interface HVACInputs {
  velocity: number;
  friction: number;
  cfm: number;
}

export interface HVACResults {
  cfm: number;
  diameterVelocity: number;
  diameterFriction: number;
  timestamp: string;
}

/**
 * Calculate CFM based on duct diameter and velocity
 * CFM = Area × Velocity
 * Area = π × (diameter/2)² (in square feet)
 */
export function calculateCFM(velocity: number, diameter: number): number {
  if (velocity <= 0 || diameter <= 0) return 0;
  
  const radiusInFeet = (diameter / 12) / 2; // Convert inches to feet
  const area = Math.PI * Math.pow(radiusInFeet, 2);
  return area * velocity;
}

/**
 * Calculate optimal duct diameter based on velocity and CFM
 * Uses standard HVAC duct sizing formulas
 * Result in inches, rounded up to nearest even number (2-inch increments) between 2-60 inches
 */
export function calculateDiameterFromVelocity(velocity: number, cfm: number): number {
  if (velocity <= 0 || cfm <= 0) return 0;
  
  const areaSquareFeet = cfm / velocity;
  const diameterFeet = Math.sqrt(4 * areaSquareFeet / Math.PI);
  const diameterInches = diameterFeet * 12;
  
  // Round up to next even number (2-inch increments)
  // If already even, go to next even number; if odd, round up to next even
  const roundedDiameter = Math.floor(diameterInches / 2) * 2 + 2;
  
  // Constrain to 2-60 inches range
  return Math.max(2, Math.min(60, roundedDiameter));
}

/**
 * Calculate duct diameter based on friction loss and CFM
 * Using interpolation from Excel data for friction rate 0.1 in./100ft
 * Result rounded up to nearest even number (2-inch increments) between 2-60 inches
 */
export function calculateDiameterFromFriction(friction: number, cfm: number): number {
  if (friction <= 0 || cfm <= 0) return 0;
  
  // Excel data points for friction = 0.1
  const excelData = [
    {cfm: 1000, diameter: 14}, {cfm: 1500, diameter: 18}, {cfm: 2000, diameter: 20},
    {cfm: 2500, diameter: 20}, {cfm: 3500, diameter: 24}, {cfm: 4500, diameter: 26},
    {cfm: 5500, diameter: 28}, {cfm: 6500, diameter: 30}, {cfm: 7500, diameter: 30},
    {cfm: 8500, diameter: 32}, {cfm: 9500, diameter: 34}, {cfm: 10500, diameter: 34},
    {cfm: 11500, diameter: 36}, {cfm: 13500, diameter: 38}, {cfm: 15500, diameter: 40},
    {cfm: 18000, diameter: 42}, {cfm: 21000, diameter: 46}, {cfm: 28500, diameter: 50},
    {cfm: 31500, diameter: 52}, {cfm: 34500, diameter: 54}, {cfm: 37500, diameter: 56},
    {cfm: 40500, diameter: 58}, {cfm: 43500, diameter: 58}, {cfm: 46500, diameter: 60}
  ];
  
  // If friction is not 0.1, scale the result proportionally
  const frictionFactor = Math.pow(0.1 / friction, 0.2); // Approximate scaling
  
  // Find the appropriate diameter by interpolation
  if (cfm <= excelData[0].cfm) {
    return Math.max(2, Math.min(60, Math.round(excelData[0].diameter * frictionFactor / 2) * 2));
  }
  
  if (cfm >= excelData[excelData.length - 1].cfm) {
    return Math.max(2, Math.min(60, Math.round(excelData[excelData.length - 1].diameter * frictionFactor / 2) * 2));
  }
  
  // Linear interpolation between data points
  for (let i = 0; i < excelData.length - 1; i++) {
    if (cfm >= excelData[i].cfm && cfm <= excelData[i + 1].cfm) {
      const ratio = (cfm - excelData[i].cfm) / (excelData[i + 1].cfm - excelData[i].cfm);
      const interpolatedDiameter = excelData[i].diameter + ratio * (excelData[i + 1].diameter - excelData[i].diameter);
      const scaledDiameter = interpolatedDiameter * frictionFactor;
      
      // Round to nearest even number
      return Math.max(2, Math.min(60, Math.round(scaledDiameter / 2) * 2));
    }
  }
  
  return 2; // Fallback
}

/**
 * Validate HVAC input values
 */
export function validateHVACInputs(inputs: Partial<HVACInputs>): string[] {
  const errors: string[] = [];
  
  if (inputs.velocity !== undefined) {
    if (inputs.velocity < 100 || inputs.velocity > 5000) {
      errors.push("Velocity should be between 100-5000 ft/min");
    }
  }
  
  if (inputs.friction !== undefined) {
    if (inputs.friction < 0.01 || inputs.friction > 1.0) {
      errors.push("Friction should be between 0.01-1.0 in./100ft");
    }
  }
  
  if (inputs.cfm !== undefined) {
    if (inputs.cfm < 500 || inputs.cfm > 50000) {
      errors.push("CFM should be between 500-50000");
    }
  }
  
  return errors;
}

/**
 * Calculate all HVAC results based on inputs
 */
export function calculateHVACResults(inputs: HVACInputs): HVACResults {
  const { velocity, friction, cfm } = inputs;
  
  let diameterVelocity = 0;
  let diameterFriction = 0;
  
  // Calculate diameter based on velocity and CFM
  if (velocity > 0 && cfm > 0) {
    diameterVelocity = calculateDiameterFromVelocity(velocity, cfm);
  }
  
  // Calculate diameter based on friction and CFM
  if (friction > 0 && cfm > 0) {
    diameterFriction = calculateDiameterFromFriction(friction, cfm);
  }
  
  return {
    cfm,
    diameterVelocity,
    diameterFriction,
    timestamp: new Date().toLocaleTimeString()
  };
}
