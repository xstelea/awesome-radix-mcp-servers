import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  dts: false,
  splitting: false,
  clean: true,
  minify: true,
  bundle: true,
  noExternal: ["@modelcontextprotocol/sdk", "zod"],
});
