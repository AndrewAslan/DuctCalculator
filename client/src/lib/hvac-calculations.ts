export interface HVACInputs {
  velocity: number;
  friction: number;
  cfm: number;
}

export interface HVACResults {
  maxCFM: number;
  diameterVelocity: number;
  diameterFriction: number;
  timestamp: string;
}

/**
 * Calculate maximum CFM based on duct area and velocity
 * CFM = Area × Velocity
 * Area = π × (diameter/2)² (in square feet)
 */
export function calculateMaxCFM(velocity: number, diameter: number): number {
  if (velocity <= 0 || diameter <= 0) return 0;
  
  const radiusInFeet = (diameter / 12) / 2; // Convert inches to feet
  const area = Math.PI * Math.pow(radiusInFeet, 2);
  return area * velocity;
}

/**
 * Calculate duct diameter based on CFM and velocity
 * D = √(4 × CFM / (π × velocity))
 * Result in inches
 */
export function calculateDiameterFromVelocity(cfm: number, velocity: number): number {
  if (velocity <= 0 || cfm <= 0) return 0;
  
  const areaSquareFeet = cfm / velocity;
  const diameterFeet = Math.sqrt(4 * areaSquareFeet / Math.PI);
  return diameterFeet * 12; // Convert feet to inches
}

/**
 * Calculate duct diameter based on CFM and friction loss
 * Using Darcy-Weisbach equation approximation for HVAC ducts
 * Simplified formula: D = (CFM / (2610 × √friction))^(1/1.85)
 */
export function calculateDiameterFromFriction(cfm: number, friction: number): number {
  if (friction <= 0 || cfm <= 0) return 0;
  
  const diameter = Math.pow(cfm / (2610 * Math.sqrt(friction)), 1/1.85);
  return diameter;
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
    if (inputs.cfm < 1 || inputs.cfm > 50000) {
      errors.push("CFM should be between 1-50000");
    }
  }
  
  return errors;
}

/**
 * Calculate all HVAC results based on inputs
 */
export function calculateHVACResults(inputs: HVACInputs): HVACResults {
  const { velocity, friction, cfm } = inputs;
  
  let maxCFM = 0;
  let diameterVelocity = 0;
  let diameterFriction = 0;
  
  // Calculate diameter based on velocity if CFM and velocity are provided
  if (cfm > 0 && velocity > 0) {
    diameterVelocity = calculateDiameterFromVelocity(cfm, velocity);
  }
  
  // Calculate diameter based on friction if CFM and friction are provided
  if (cfm > 0 && friction > 0) {
    diameterFriction = calculateDiameterFromFriction(cfm, friction);
  }
  
  // Calculate max CFM based on velocity and diameter
  if (velocity > 0) {
    // Use calculated diameter if available, otherwise use a standard 12" diameter
    const calculatedDiameter = diameterVelocity > 0 ? diameterVelocity : 12;
    maxCFM = calculateMaxCFM(velocity, calculatedDiameter);
  }
  
  return {
    maxCFM,
    diameterVelocity,
    diameterFriction,
    timestamp: new Date().toLocaleTimeString()
  };
}
