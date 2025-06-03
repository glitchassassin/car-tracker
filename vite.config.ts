import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupReplace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
  server: {
    port: 51759,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
    }),
    react(),
  ],
  resolve: process.env.USE_SOURCE
    ? {
        alias: {
          "react-router": path.resolve(
            __dirname,
            "../../packages/react-router/index.ts"
          ),
          "react-router-dom": path.resolve(
            __dirname,
            "../../packages/react-router-dom/index.tsx"
          ),
        },
      }
    : {},
});
