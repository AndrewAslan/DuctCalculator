// Test calculations to match Excel values
// From Excel screenshot, I can see CFM values around 600-15000 range

// Standard CFM formula: CFM = Area × Velocity
// Area = π × (diameter/24)² (converting inches to feet and getting radius)

function testVelocityCalculation(diameter, velocity) {
  const diameterFeet = diameter / 12;
  const radius = diameterFeet / 2;
  const area = Math.PI * Math.pow(radius, 2);
  const cfm = area * velocity;
  return Math.round(cfm);
}

// Test with values from Excel
console.log("Testing velocity calculations:");
console.log(`4" diameter at 2500 FPM: ${testVelocityCalculation(4, 2500)} CFM`);
console.log(`6" diameter at 2500 FPM: ${testVelocityCalculation(6, 2500)} CFM`);
console.log(`8" diameter at 2500 FPM: ${testVelocityCalculation(8, 2500)} CFM`);
console.log(`10" diameter at 2500 FPM: ${testVelocityCalculation(10, 2500)} CFM`);

// The Excel shows much smaller values, so maybe I'm misreading the table structure
// Let me check if the table shows CFM that produces those diameters instead