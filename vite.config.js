import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // github pages serves the site under /Jammming/, so built files need that prefix
  base: "/Jammming/",
});
