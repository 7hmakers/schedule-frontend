import { defineConfig } from "vite";
import PluginLegacy from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "/schedule",
  plugins: [
    PluginLegacy({
      targets: ["defaults", "IE 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
});
