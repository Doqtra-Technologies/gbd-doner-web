import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gbd: {
          red: "#C94035",
          "red-dark": "#A8312A",
          navy: "#0F1E2D",
          "navy-soft": "#1A2B3D",
          cream: "#F7F3EC",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        body: ["var(--font-open-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "0.02em",
      },
      maxWidth: {
        shell: "1280px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
