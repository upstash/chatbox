import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    chatbox: "./package/widget/index.tsx",
    admin: "./package/admin/index.tsx",
    api: "./package/api.ts",
  },
  format: ["cjs", "esm"],
  clean: true,
  bundle: true,
  dts: true,
});
