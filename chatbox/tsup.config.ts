import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    ui: "./package/index.ts",
    api: "./package/api.ts",
  },
  format: ["cjs", "esm"],
  clean: true,
  bundle: true,
  dts: true,
});
