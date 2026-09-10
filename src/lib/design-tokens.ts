/**
 * CyKemet.com Design Tokens
 *
 * Typed constants mirroring the CSS custom properties in globals.css.
 * Source of truth: Figma "Design system" page
 * https://www.figma.com/design/A4Dc2JnyBcpLIXsFx0yEnr/CyKemet.com
 *
 * Use these in:
 * - Dynamic style calculations that require raw values
 * - Canvas / chart libraries (Recharts, Chart.js) that don't accept Tailwind classes
 * - Test assertions
 *
 * For JSX styling, always prefer Tailwind utility classes over these constants.
 */

// ─── Primary ──────────────────────────────────────────────────────────────────

export const colorPrimary = {
  50:  "#e5ecff",
  100: "#ccdaff",
  200: "#99b4ff",
  300: "#668fff",
  400: "#3369ff",
  500: "#003bdf",
  600: "#0036cc",
  700: "#002999",
  800: "#001b66",
  900: "#000e33",
  950: "#00071a",
  DEFAULT: "#003bdf",
} as const;

// ─── Secondary ────────────────────────────────────────────────────────────────

export const colorSecondary = {
  50:  "#e9f4fc",
  100: "#d2e9f9",
  200: "#a5d2f3",
  300: "#78bced",
  400: "#4ba6e7",
  500: "#e9f4fc",
  600: "#1873b4",
  700: "#125687",
  800: "#0c395a",
  900: "#061d2d",
  950: "#030e16",
  DEFAULT: "#e9f4fc",
} as const;

// ─── Background ───────────────────────────────────────────────────────────────

export const colorBg = {
  50:  "#e9f4fb",
  100: "#d3e9f8",
  200: "#a7d3f1",
  300: "#7bbeea",
  400: "#4fa8e3",
  500: "#d3e9f8",
  600: "#1c75b0",
  700: "#155884",
  800: "#0e3a58",
  900: "#071d2c",
  950: "#040f16",
  // Semantic
  page:     "#040f16",
  card:     "#071d2c",
  surface:  "#0e3a58",
  elevated: "#155884",
  border:   "#1c75b0",
} as const;

// ─── Error ────────────────────────────────────────────────────────────────────

export const colorError = {
  50:  "#fee7eb",
  100: "#fccfd6",
  200: "#f99fae",
  300: "#f76e85",
  400: "#f43e5c",
  500: "#f43f5d",
  600: "#c10b29",
  700: "#91081f",
  800: "#600615",
  900: "#30030a",
  950: "#180105",
  DEFAULT: "#f43f5d",
} as const;

// ─── Success ──────────────────────────────────────────────────────────────────

export const colorSuccess = {
  50:  "#e9fbf0",
  100: "#d4f7e1",
  200: "#a9efc3",
  300: "#7ee7a4",
  400: "#52e086",
  500: "#4ade80",
  600: "#1fad53",
  700: "#18813e",
  800: "#10562a",
  900: "#082b15",
  950: "#04160a",
  DEFAULT: "#4ade80",
} as const;

// ─── Warning ──────────────────────────────────────────────────────────────────

export const colorWarning = {
  50:  "#fff8e6",
  100: "#fef0cd",
  200: "#fde19b",
  300: "#fcd269",
  400: "#fbc437",
  500: "#fbbe24",
  600: "#c89104",
  700: "#966c03",
  800: "#644802",
  900: "#322401",
  950: "#191200",
  DEFAULT: "#fbbe24",
} as const;

// ─── Content / Text ───────────────────────────────────────────────────────────

export const colorContent = {
  50:  "#f2f2f2",
  100: "#e5e6e6",
  200: "#cbcdcd",
  300: "#b1b4b4",
  400: "#979b9b",
  500: "#1c1d1d",
  600: "#646868",
  700: "#4b4e4e",
  800: "#323434",
  900: "#191a1a",
  950: "#0d0d0d",
  DEFAULT: "#1c1d1d",
} as const;

// Semantic text tokens (dark mode)
export const colorText = {
  primary:   "#f2f2f2",
  secondary: "#cbcdcd",
  muted:     "#979b9b",
  disabled:  "#646868",
  inverse:   "#1c1d1d",
} as const;

// ─── Palette aliases ──────────────────────────────────────────────────────────

export const colorPalette = {
  primary:             colorPrimary.DEFAULT,
  secondary:           colorSecondary.DEFAULT,
  background:          "#f7f7f7",
  greyRegistration:    "#6d6d6d",
  greyMain:            "#85a0b2",
  primaryText:         colorContent.DEFAULT,
} as const;

// ─── Severity ─────────────────────────────────────────────────────────────────

// Verified from Figma severity badge nodes 4:11535–4:11547
export const colorSeverity = {
  critical:      "#f43f5d",  // error-500
  high:          "#ff7104",  // custom orange
  medium:        "#fbbe24",  // warning-500
  low:           "#003bdf",  // primary-500
  informational: "#85a0b2",  // grey-main
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export type FontWeight = "normal" | "medium" | "bold";

export interface TypographyToken {
  fontSize:      string;
  lineHeight:    string;
  letterSpacing: string;
}

export const typography = {
  // Title scale (display / hero)
  "title-1": { fontSize: "64px", lineHeight: "70px", letterSpacing: "-0.4px" },
  "title-2": { fontSize: "40px", lineHeight: "48px", letterSpacing: "-0.4px" },
  "title-3": { fontSize: "32px", lineHeight: "36px", letterSpacing: "-0.4px" },

  // Heading scale
  h1: { fontSize: "28px", lineHeight: "36px", letterSpacing: "-0.4px" },
  h2: { fontSize: "26px", lineHeight: "30px", letterSpacing: "-0.4px" },
  h3: { fontSize: "24px", lineHeight: "28px", letterSpacing: "-0.4px" },
  h4: { fontSize: "20px", lineHeight: "24px", letterSpacing: "-0.4px" },

  // Body scale
  "body-1": { fontSize: "16px", lineHeight: "22px", letterSpacing: "-0.4px" },
  "body-2": { fontSize: "14px", lineHeight: "20px", letterSpacing: "-0.4px" },
  "body-3": { fontSize: "12px", lineHeight: "16px", letterSpacing: "-0.4px" },

  // Label scale
  "label-1": { fontSize: "17px", lineHeight: "20px", letterSpacing: "-0.4px" },
  "label-2": { fontSize: "15px", lineHeight: "18px", letterSpacing: "-0.4px" },
  "label-3": { fontSize: "13px", lineHeight: "16px", letterSpacing: "-0.4px" },
  "label-4": { fontSize: "12px", lineHeight: "14px", letterSpacing: "-0.4px" },
  "label-5": { fontSize: "11px", lineHeight: "14px", letterSpacing: "-0.4px" },
} as const satisfies Record<string, TypographyToken>;

// ─── Border Radius ────────────────────────────────────────────────────────────
// TODO: verify exact values from Figma Components frame (node 4:11448)

export const radius = {
  card:   "12px",
  btn:    "8px",
  input:  "8px",
  badge:  "6px",
  modal:  "16px",
  chip:   "20px",
  full:   "9999px",
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadows = {
  card:     "0 4px 24px 0 rgb(0 0 0 / 0.32)",
  modal:    "0 8px 40px 0 rgb(0 0 0 / 0.48)",
  dropdown: "0 4px 16px 0 rgb(0 0 0 / 0.24)",
  btn:      "0 2px  8px 0 rgb(0 59 223 / 0.24)",
} as const;

// ─── Layout ───────────────────────────────────────────────────────────────────

export const layout = {
  sidebarWidth: "240px",
  topbarHeight: "64px",
} as const;

// ─── Icon sizes ───────────────────────────────────────────────────────────────
// Icon set: lucide-react (all icons are 24×24 by default)

export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSize = keyof typeof iconSize;
