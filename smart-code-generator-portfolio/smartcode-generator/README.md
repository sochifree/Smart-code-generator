# SmartCode Generator

**A small Node.js prototype for generating clearer alphanumeric request numbers and delivery PINs.**

SmartCode addresses a simple operational usability issue: some letters and digits look alike when codes are handwritten, printed, or displayed in different typefaces. This can cause avoidable delays and data-entry mistakes.

## The proposal

Generate eight-character codes using a restricted character set:

- Exclude the letters `O`, `I`, and `Q`.
- Exclude the digits `0`, `1`, and `9`.
- Include exactly two or three digits in each code.
- Keep the total code length at eight characters.
- Use Node.js cryptographic randomness rather than `Math.random()`.

### Approved character pools

| Type | Characters |
|---|---|
| Letters | `ABCDEFGHJKLMNPRSTUVWXYZ` |
| Digits | `2345678` |

Example formats (illustrative only):

```text
AB3K7MNP
6RT2HABC
GH5K8MNP
```

## Run the demonstration

Requirements: Node.js 18 or later.

```bash
git clone https://github.com/sochifree/smartcode-generator.git
cd smartcode-generator
npm start
```

The demo prints ten unique sample codes and validates their format.

## Run the tests

```bash
npm test
```

The automated tests check:
- Character exclusions.
- Eight-character length.
- Two-or-three-digit requirement.
- Approved character set.
- Format validation.
- Unique batch generation.
- Invalid batch-size handling.

## Project structure

```text
smartcode-generator/
├── src/
│   ├── generator.js
│   └── demo.js
├── test/
│   └── generator.test.js
├── docs/
│   └── technical-proposal.md
├── screenshots/
│   └── demo-output.png
├── package.json
└── README.md
```

## Important production considerations

This repository is a prototype, not a drop-in replacement for the company's existing generator.

Before production use, the IT team should:
1. Confirm the approved character policy and whether excluding `0` and `1` is acceptable.
2. Check compatibility with existing request-number and delivery-PIN formats, integrations, labels, and validation rules.
3. Enforce request-number uniqueness with a database unique constraint and retry on collision. The included batch uniqueness check only applies within one running process.
4. Treat delivery PINs as authentication secrets: rate-limit attempts, store them securely (preferably as a keyed hash where appropriate), expire them, and avoid logging them in plaintext.
5. Review the required PIN entropy and threat model. Eight characters with only two or three digits is a readability-oriented format, not automatically suitable for every security-sensitive use.
6. Run a pilot and compare code-entry errors and processing time before and after the change.

## Design decision

This prototype excludes `0` and `1` in addition to the four characters raised in the original suggestion. Excluding `O` while retaining `0`, or excluding `I` while retaining `1`, would leave some visual ambiguity. The final policy should be agreed with the IT team.

## Author

**Sochima Henry Ugochukwu**  
GitHub: [github.com/sochifree](https://github.com/sochifree)

*Independent proof-of-concept demonstrating practical problem-solving, JavaScript programming, input validation, testing, and security-aware design.*
