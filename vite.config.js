import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcss from "postcss";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/Test/setUp.js",
    css: {
      postcss,
    },
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
