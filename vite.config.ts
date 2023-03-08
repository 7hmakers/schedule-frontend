import { defineConfig } from "vite";
import PluginLegacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    // Must transform esm
    PluginLegacy({
      targets: ["defaults", "not IE 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
});
