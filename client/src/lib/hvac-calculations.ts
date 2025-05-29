export interface HVACInputs {
  velocity: number;
  friction: number;
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
 * Calculate duct diameter based on velocity using standard diameter range
 * For velocity-based calculations, we'll use a reference CFM
 * D = √(4 × CFM / (π × velocity))
 * Result in inches, constrained to 2-60 inches
 */
export function calculateDiameterFromVelocity(velocity: number, referenceCFM: number = 1000): number {
  if (velocity <= 0) return 0;
  
  const areaSquareFeet = referenceCFM / velocity;
  const diameterFeet = Math.sqrt(4 * areaSquareFeet / Math.PI);
  const diameterInches = diameterFeet * 12;
  
  // Constrain to 2-60 inches range
  return Math.max(2, Math.min(60, diameterInches));
}

/**
 * Calculate duct diameter based on friction loss using standard friction calculations
 * Using Darcy-Weisbach equation approximation for HVAC ducts
 * Simplified formula: D = (CFM / (2610 × √friction))^(1/1.85)
 * Result constrained to 2-60 inches
 */
export function calculateDiameterFromFriction(friction: number, referenceCFM: number = 1000): number {
  if (friction <= 0) return 0;
  
  const diameter = Math.pow(referenceCFM / (2610 * Math.sqrt(friction)), 1/1.85);
  
  // Constrain to 2-60 inches range
  return Math.max(2, Math.min(60, diameter));
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
  
  return errors;
}

/**
 * Calculate all HVAC results based on inputs
 */
export function calculateHVACResults(inputs: HVACInputs): HVACResults {
  const { velocity, friction } = inputs;
  
  let cfm = 0;
  let diameterVelocity = 0;
  let diameterFriction = 0;
  
  // Calculate diameter based on velocity (using reference CFM of 1000)
  if (velocity > 0) {
    diameterVelocity = calculateDiameterFromVelocity(velocity, 1000);
  }
  
  // Calculate diameter based on friction (using reference CFM of 1000)
  if (friction > 0) {
    diameterFriction = calculateDiameterFromFriction(friction, 1000);
  }
  
  // Calculate CFM based on velocity and the calculated diameter from velocity
  if (velocity > 0 && diameterVelocity > 0) {
    cfm = calculateCFM(velocity, diameterVelocity);
  }
  
  return {
    cfm,
    diameterVelocity,
    diameterFriction,
    timestamp: new Date().toLocaleTimeString()
  };
}
