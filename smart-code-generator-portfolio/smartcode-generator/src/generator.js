const crypto = require("node:crypto");

// Ambiguous characters are intentionally excluded.
// Letters: excludes I, O and Q.
// Digits: excludes 0, 1 and 9.
const LETTERS = "ABCDEFGHJKLMNPRSTUVWXYZ";
const DIGITS = "2345678";
const CODE_LENGTH = 8;

/**
 * Returns one cryptographically random character from a character set.
 * @param {string} characters
 * @returns {string}
 */
function pickRandom(characters) {
  if (typeof characters !== "string" || characters.length === 0) {
    throw new TypeError("A non-empty character set is required.");
  }

  return characters[crypto.randomInt(characters.length)];
}

/**
 * Shuffles an array using Fisher-Yates and crypto.randomInt.
 * @param {string[]} items
 * @returns {string[]}
 */
function secureShuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Generates an eight-character code containing exactly two or three digits.
 * @returns {string}
 */
function generateCode() {
  const digitCount = crypto.randomInt(2, 4); // 2 or 3, upper bound excluded
  const letterCount = CODE_LENGTH - digitCount;
  const characters = [];

  for (let i = 0; i < digitCount; i += 1) {
    characters.push(pickRandom(DIGITS));
  }

  for (let i = 0; i < letterCount; i += 1) {
    characters.push(pickRandom(LETTERS));
  }

  return secureShuffle(characters).join("");
}

/**
 * Validates the agreed code format.
 * @param {string} code
 * @returns {boolean}
 */
function isValidCode(code) {
  if (typeof code !== "string" || code.length !== CODE_LENGTH) {
    return false;
  }

  if (!/^[ABCDEFGHJKLMNPRSTUVWXYZ2345678]{8}$/.test(code)) {
    return false;
  }

  const digitCount = (code.match(/[2345678]/g) || []).length;
  return digitCount === 2 || digitCount === 3;
}

/**
 * Generates a batch of unique codes within this process.
 * Production systems must also enforce uniqueness in their database.
 * @param {number} count
 * @returns {string[]}
 */
function generateUniqueBatch(count) {
  if (!Number.isInteger(count) || count < 1 || count > 10000) {
    throw new RangeError("Count must be an integer between 1 and 10,000.");
  }

  const codes = new Set();
  while (codes.size < count) {
    codes.add(generateCode());
  }

  return [...codes];
}

module.exports = {
  CODE_LENGTH,
  LETTERS,
  DIGITS,
  generateCode,
  generateUniqueBatch,
  isValidCode
};
