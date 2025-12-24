import type { Config } from "jest";

const config: Config = {
    testEnvironment: "jsdom",
    preset: "ts-jest/presets/default-esm",

    extensionsToTreatAsEsm: [".ts", ".tsx"],

    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },

    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};

export default config;
