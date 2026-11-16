# Technical Proposal: Readable Request Number and Delivery PIN Generation

**Project:** SmartCode Generator  
**Prepared by:** Sochima Henry Ugochukwu  
**Status:** Prototype for technical review

## 1. Background

The current alphanumeric code format can contain visually similar characters. When a code is handwritten, printed, or rendered in different fonts, staff may need to interpret whether a character is a letter or a digit. This can slow down processing and contribute to entry errors.

## 2. Proposed change

Introduce an approved character allowlist for newly generated codes:

- Letters: `ABCDEFGHJKLMNPRSTUVWXYZ`
- Digits: `2345678`
- Length: eight characters
- Numeric composition: exactly two or three digits

The prototype excludes `O`, `I`, `Q`, `0`, `1`, and `9`.

## 3. Expected benefits

- Easier visual identification of codes.
- Fewer avoidable transcription and data-entry mistakes.
- Less time spent clarifying ambiguous handwritten characters.
- A small, contained change to the code-generation logic, subject to compatibility review.

These are expected benefits; a pilot should measure actual results.

## 4. Prototype implementation

The attached Node.js prototype:
- Uses Node.js `crypto.randomInt()` for random selection.
- Uses a cryptographically random Fisher-Yates shuffle.
- Validates code length, allowed characters, and digit count.
- Includes automated tests and a runnable demonstration.

## 5. Risks and controls

| Risk | Recommended control |
|---|---|
| Existing systems reject the new character set | Review all integrations and validation rules before rollout |
| Duplicate request numbers | Enforce a database unique constraint and retry on collision |
| PIN guessing or abuse | Rate-limit attempts, expire PINs, and assess entropy against the threat model |
| Staff unfamiliarity with new format | Communicate the change and run a limited pilot |
| Lost code space from excluding characters | Confirm capacity is sufficient for expected code volumes |

## 6. Suggested pilot

1. Confirm the final allowlist with IT and operations.
2. Run the generator in a test environment.
3. Test printed, on-screen, and handwritten examples.
4. Pilot with a small group of staff.
5. Compare entry-error rates, correction requests, and average processing time against the current process.
6. Decide whether to adopt, revise, or reject the change based on results.

## 7. Scope and limitations

This is an independent proof-of-concept, not a production integration. It does not connect to the company's database or modify the live code-generation system. Production implementation requires IT review, integration testing, security review, and approval.

## 8. Review requested

I would appreciate feedback from the IT team on the proposed character set, compatibility requirements, and whether this approach could be evaluated in a test environment.
