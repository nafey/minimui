import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Proxy requests from /api to the new target
      "/api": {
        target: "http://localhost:3333", // New target
        changeOrigin: true, // Changes the origin of the host header to the target URL
        // rewrite: (path) => path.replace(/^\/api/, ""), // Optional: rewrite the path
      },
    },
  },
  plugins: [react()],
});
