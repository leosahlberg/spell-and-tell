import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false,
    },
    proxy: {
      "/user": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
      "/login": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
      "/story": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
      "/invitation": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
