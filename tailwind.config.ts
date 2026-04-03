import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        curator: {
          bg: "#0e0e0f",
          surface: "#0e0e0f",
          surface_dim: "#0e0e0f",
          surface_bright: "#2b2c2f",
          surface_container_lowest: "#000000",
          surface_container_low: "#131315",
          surface_container: "#19191b",
          surface_container_high: "#1f1f22",
          surface_container_highest: "#252628",
          on_surface: "#e7e5e8",
          on_surface_variant: "#acaaae",
          primary: "#bac5ee",
          primary_container: "#3b4668",
          on_primary: "#343f61",
          on_primary_container: "#c4cff8",
          primary_dim: "#adb7e0",
          secondary: "#9093ff",
          secondary_container: "#201cb4",
          on_secondary: "#080079",
          on_secondary_container: "#b8b9ff",
          tertiary: "#e0ecff",
          tertiary_container: "#cfdef5",
          tertiary_dim: "#c1d0e6",
          outline: "#757578",
          outline_variant: "rgba(72, 72, 75, 0.1)",
          error: "#ee7d77",
          on_error: "#490106",
          on_error_container: "#ff9993"
        }
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
