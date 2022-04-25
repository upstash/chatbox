import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    widget: "./src/components/Widget/index.tsx",
    admin: "./src/components/Admin/index.tsx",
    api: "./src/api.ts",
  },
  format: ["cjs", "esm"],
  clean: true,
  bundle: true,
  dts: true,
});
