/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB", // Primary Blue Light
          700: "#1D4ED8", // Primary Blue Light Hover
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        neutral: {
          white: "#FFFFFF",
          heading: "#111827", // Primary Text Light
          body: "#4B5563",    // Secondary Text Light
          border: "#E5E7EB",  // Subtle Border Light
        },
        dark: {
          canvas: "#0F172A",   // Canvas Background Dark
          surface: "#1E293B",  // Surface Base Dark
          border: "#334155",   // Subtle Border Dark
          heading: "#F8FAFC",  // Primary Text Dark
          body: "#CBD5E1",     // Secondary Text Dark
        },
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        surface: "var(--color-surface-base)",
        bg: "var(--color-canvas)",
        ink: "var(--color-text-primary)",
        muted: "var(--color-text-secondary)",
        line: "var(--color-border-subtle)",
      },
    },
  },
  plugins: [],
};
