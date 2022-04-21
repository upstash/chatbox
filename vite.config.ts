import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, "src/package/index.ts"),
  //     name: "Chatbox",
  //     fileName: (format) => `index.${format}.js`,
  //   },
  //   rollupOptions: {
  //     external: ["react", "react-dom"],
  //     output: {
  //       globals: {
  //         react: "React",
  //       },
  //     },
  //   },
  // },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react", "react-dom"],
      input: {
        admin: path.resolve(__dirname, "src/package/admin/index.tsx"),
        widget: path.resolve(__dirname, "src/package/widget/index.tsx"),
      },
      output: [
        {
          dir: path.resolve(__dirname, "dist"),
          format: "esm",
          entryFileNames: "[name].[format].js",
          globals: {
            react: "React",
          },
        },
        {
          dir: path.resolve(__dirname, "dist"),
          format: "cjs",
          entryFileNames: "[name].[format].js",
          globals: {
            react: "React",
          },
        },
      ],
    },
    sourcemap: false,
  },
});
