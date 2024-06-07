import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  rules: { "react/prop-types": "off" },
  server: {
    proxy: {
      "/api": { target: "http://localhost:9000", changeOrigin: true },
    },
  },
});
