import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 10231,
    proxy: {
      "/nest/": {
        target: "http://localhost:4563",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nest/, ""),
      },
    },
  },
});
