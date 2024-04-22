import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.test.tsx", "**/*.test.ts"],
  maxWorkers: 1,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$":
      "<rootDir>/src/testing/_mocking_/fileMock.ts",
  },
};

export default config;
