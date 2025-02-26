import type { Config } from "tailwindcss";

export default {
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
        cardBgDark: "var(--card-bg-dark)",
        cardBgLight: "var(--card-bg-light)",
        cardBorder: "var(--card-border)",
      },
    },
  },
  plugins: [],
} satisfies Config;
