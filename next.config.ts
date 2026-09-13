import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Empaqueta servidor + dependencias mínimas en .next/standalone.
   * La imagen Docker final no lleva node_modules completo.
   */
  output: "standalone",
};

export default nextConfig;
