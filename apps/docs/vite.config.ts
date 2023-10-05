import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";

export default {
  plugins: [react(), vanillaExtractPlugin()],
};
