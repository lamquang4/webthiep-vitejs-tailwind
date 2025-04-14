import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    legacy({
      targets: ["defaults", "not IE 11", "iOS >= 12"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
});
