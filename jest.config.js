require('dotenv').config();

module.exports = {
    testMatch: ["**/__tests__/**/*.js"],
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.js"],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
    rootDir: "."
};