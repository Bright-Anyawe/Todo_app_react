import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/Test/setUp.js",
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, 
        },
        format: {
          comments: false, 
        },
        mangle: {
          properties: {
            regex: /^_/ 
          },
        },
      },
    },
  },
});
