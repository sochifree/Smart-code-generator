const test = require("node:test");
const assert = require("node:assert/strict");

const {
  LETTERS,
  DIGITS,
  generateCode,
  generateUniqueBatch,
  isValidCode
} = require("../src/generator");

test("character pools exclude ambiguous characters", () => {
  for (const character of ["O", "I", "Q"]) {
    assert.equal(LETTERS.includes(character), false);
  }

  for (const character of ["0", "1", "9"]) {
    assert.equal(DIGITS.includes(character), false);
  }
});

test("generated code is exactly eight characters", () => {
  assert.equal(generateCode().length, 8);
});

test("generated code contains exactly two or three digits", () => {
  for (let i = 0; i < 500; i += 1) {
    const code = generateCode();
    const digits = (code.match(/[2345678]/g) || []).length;
    assert.ok(digits === 2 || digits === 3);
  }
});

test("generated codes contain only approved characters", () => {
  for (let i = 0; i < 500; i += 1) {
    assert.match(generateCode(), /^[ABCDEFGHJKLMNPRSTUVWXYZ2345678]{8}$/);
  }
});

test("format validator accepts valid examples", () => {
  assert.equal(isValidCode("AB3K7MNP"), true);
  assert.equal(isValidCode("6RT2HABC"), true);
});

test("format validator rejects invalid examples", () => {
  for (const code of ["ABO3K7MN", "AB1K7MNP", "AB9K7MNP", "AB3K7MN", "ABCDEFGH"]) {
    assert.equal(isValidCode(code), false);
  }
});

test("batch generator returns the requested number of unique codes", () => {
  const codes = generateUniqueBatch(100);
  assert.equal(codes.length, 100);
  assert.equal(new Set(codes).size, 100);
  assert.ok(codes.every(isValidCode));
});

test("batch generator rejects invalid counts", () => {
  assert.throws(() => generateUniqueBatch(0), RangeError);
  assert.throws(() => generateUniqueBatch(1.5), RangeError);
});
