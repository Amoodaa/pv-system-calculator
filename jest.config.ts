// jest.config.ts
import { createDefaultPreset, type JestConfigWithTsJest } from "ts-jest";

const presetConfig = createDefaultPreset({
  tsconfig: "./tsconfig.json",
});

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
};

export default jestConfig;
