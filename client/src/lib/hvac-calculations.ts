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
 * Using exact Excel formula: EVEN((((0.109136*CFM^1.9)/friction))^(1/5.02))
 * Result rounded up to nearest even number (2-inch increments) between 2-60 inches
 */
export function calculateDiameterFromFriction(friction: number, cfm: number): number {
  if (friction <= 0 || cfm <= 0) return 0;
  
  // Exact Excel formula: ((0.109136*CFM^1.9)/friction)^(1/5.02)
  const diameter = Math.pow((0.109136 * Math.pow(cfm, 1.9)) / friction, 1/5.02);
  
  // Excel EVEN function: round up to nearest even number
  const roundedDiameter = Math.ceil(diameter / 2) * 2;
  
  // Constrain to 2-60 inches range
  return Math.max(2, Math.min(60, roundedDiameter));
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
    if (inputs.cfm < 100 || inputs.cfm > 55100) {
      errors.push("CFM should be between 100-55100");
    }
  }
  
  return errors;
}

/**
 * Calculate CFM based on friction limit and duct diameter
 * Derived from Excel friction formula: diameter = EVEN(((0.109136*CFM^1.9)/friction)^(1/5.02))
 * Solving for CFM: CFM = ((friction * diameter^5.02) / 0.109136)^(1/1.9)
 */
export function calculateCFMFromFriction(friction: number, diameter: number): number {
  if (friction <= 0 || diameter <= 0) return 0;
  
  // Reverse the Excel formula: diameter = ((0.109136*CFM^1.9)/friction)^(1/5.02)
  // Solving for CFM: CFM = ((friction * diameter^5.02) / 0.109136)^(1/1.9)
  const cfm = Math.pow((friction * Math.pow(diameter, 5.02)) / 0.109136, 1/1.9);
  return cfm;
}

/**
 * Calculate CFM based on velocity limit and duct diameter
 * Exactly matching Excel formula: diameter = EVEN(SQRT((CFM/3.14159)*4)/velocity*12)
 * Rearranging for CFM: CFM = PI * (diameter * velocity / 12)^2 / 4
 */
export function calculateCFMFromVelocity(velocity: number, diameter: number): number {
  if (velocity <= 0 || diameter <= 0) return 0;
  
  // From Excel: diameter = SQRT((CFM/PI)*4)/velocity*12
  // Rearranging step by step:
  // diameter = SQRT((CFM/PI)*4) / velocity * 12
  // diameter * velocity / 12 = SQRT((CFM/PI)*4)
  // (diameter * velocity / 12)^2 = (CFM/PI)*4
  // CFM = PI * (diameter * velocity / 12)^2 / 4
  
  const cfm = Math.PI * Math.pow(diameter * velocity / 12, 2) / 4;
  return cfm;
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
