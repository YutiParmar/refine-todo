import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Exposes the server to the network
    port: 5173, // You can change the port if needed
    strictPort: true, // Ensures it runs on the specified port
  },
});
