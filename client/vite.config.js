import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://mern-blog-backend-1bum.onrender.com",
      secure: false,
    },
    logLevel: "debug",
  },
  plugins: [react()],
});
