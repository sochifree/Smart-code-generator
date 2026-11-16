const { generateCode, generateUniqueBatch, isValidCode } = require("./generator");

console.log("\nSMARTCODE GENERATOR");
console.log("===================");
console.log("Format: 8 characters | 2–3 digits | ambiguous characters excluded\n");

const sampleCodes = generateUniqueBatch(10);

sampleCodes.forEach((code, index) => {
  console.log(`${String(index + 1).padStart(2, "0")}. ${code}  ${isValidCode(code) ? "VALID" : "INVALID"}`);
});

console.log(`\nGenerated ${sampleCodes.length} unique sample codes.`);
console.log(`One additional random code: ${generateCode()}\n`);
