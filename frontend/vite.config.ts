import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "@svgr/rollup";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
// @ts-expect-error work with vite
import path from "path";
// @ts-expect-error work with vite
import { fileURLToPath } from "url";

// @ts-expect-error work with vite
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), TanStackRouterVite(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  server: {
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/variables.scss";`,
        quietDeps: true, // Suppress warnings in dependency files
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 3000,
  },
});
