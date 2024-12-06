import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",

        primary: "var(--primary)",
        primaryLight: "var(--primary-light)",
        primaryDark: "var(--primary-dark)",

        success: "var(--success)",
        successLight: "var(--success-light)",
        successDark: "var(--success-dark)",

        warning: "var(--warning)",
        warningLight: "var(--warning-light)",
        warningDark: "var(--warning-dark)",

        error: "var(--error)",
        errorLight: "var(--error-light)",
        errorDark: "var(--error-dark)",

        info: "var(--info)",
        infoLight: "var(--info-light)",
        infoDark: "var(--info-dark)",
      },
      fontSize: {
        xxs: "0.625rem", // Custom 'xxs' font size (10px, assuming a 16px base)
      },
    },
  },
  plugins: [],
};

export default config;
