/**
 * CyKemet.com — Tailwind Configuration
 *
 * NOTE: This project uses Tailwind CSS v4.
 * All design tokens (colors, typography, spacing, shadows, border-radius)
 * are defined in `src/app/globals.css` inside the `@theme {}` block.
 *
 * This file is intentionally minimal — it exists for plugin registration
 * and any v4-compatible config overrides that cannot be expressed in CSS.
 *
 * Do NOT add theme tokens here. Edit globals.css instead.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // All theme customization lives in globals.css @theme block
  theme: {},
  plugins: [],
};

export default config;
