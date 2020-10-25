module.exports = {
    roots: ["<rootDir>/app/javascript/packs"],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "node",
    globals: {
      "ts-jest": {
        diagnostics: {
          warnOnly: true
        }
      }
    },
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupTestFrameworkScriptFile: "<rootDir>/testSetup.ts",
    collectCoverageFrom: [
      "testSetup.ts",
      "!**/node_modules/**",
      "!**/vendor/**"
    ]
  };