import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Dev server port (optional, default is 5173)
    host: true, // Listen on 0.0.0.0, required for Docker
    strictPort: true, // Fail if port is already in use
  },
});
