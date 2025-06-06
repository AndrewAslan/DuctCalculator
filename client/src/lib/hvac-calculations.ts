export interface HVACInputs {
  velocity: number;
  friction: number;
}

export interface HVACTableRow {
  cfm: number;
  [key: string]: number; // Allow dynamic diameter properties
}

export interface HVACResults {
  velocityBasedTable: HVACTableRow[];
  frictionBasedTable: HVACTableRow[];
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
  

  
  return errors;
}

/**
 * Generate CFM options for the table (100, 600, 1100, 1600... up to 55,100)
 */
export function generateCFMOptions(): number[] {
  const cfmOptions: number[] = [];
  for (let i = 100; i <= 55100; i += 500) {
    cfmOptions.push(i);
  }
  return cfmOptions;
}

/**
 * Generate duct diameter options (4, 6, 8... up to 60 inches)
 */
export function generateDiameterOptions(): number[] {
  const diameterOptions: number[] = [];
  for (let diameter = 4; diameter <= 60; diameter += 2) {
    diameterOptions.push(diameter);
  }
  return diameterOptions;
}

/**
 * Calculate required diameter for given velocity and CFM using the same formula as before
 */
export function calculateRequiredDiameterVelocity(velocity: number, cfm: number): number {
  return calculateDiameterFromVelocity(velocity, cfm);
}

/**
 * Calculate required diameter for given friction and CFM using the same Excel formula as before
 */
export function calculateRequiredDiameterFriction(friction: number, cfm: number): number {
  return calculateDiameterFromFriction(friction, cfm);
}

/**
 * Calculate all HVAC results based on inputs - using the same calculations as before
 */
export function calculateHVACResults(inputs: HVACInputs): HVACResults {
  const cfmOptions = generateCFMOptions();
  
  // For velocity table: show the calculated diameter for each CFM using velocity formula
  const velocityBasedTable: HVACTableRow[] = cfmOptions.map(cfm => {
    const calculatedDiameter = calculateDiameterFromVelocity(inputs.velocity, cfm);
    return {
      cfm,
      calculatedDiameter
    };
  });

  // For friction table: show the calculated diameter for each CFM using friction formula
  const frictionBasedTable: HVACTableRow[] = cfmOptions.map(cfm => {
    const calculatedDiameter = calculateDiameterFromFriction(inputs.friction, cfm);
    return {
      cfm,
      calculatedDiameter
    };
  });
  
  return {
    velocityBasedTable,
    frictionBasedTable,
    timestamp: new Date().toISOString()
  };
}
