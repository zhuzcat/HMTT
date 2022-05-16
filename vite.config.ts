import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
});
