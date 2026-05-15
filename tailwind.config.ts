import type { Config } from "tailwindcss";

/**
 * GBD Tailwind theme.
 *
 * Two colour layers:
 *   `gbd.*`  — primitive brand colours (3 only). Avoid using directly in
 *              components; prefer the semantic layer below.
 *   `text.*` / `bg.*` / `border.*` / `accent` — semantic tokens that map
 *              intent → primitive. Components should consume these.
 *
 * Adding a new colour requires brand-team approval AND a corresponding
 * semantic mapping. Off-brand tints (red-dark, navy-soft, cream) are
 * explicitly excluded and must not be reintroduced.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gbd: {
          red: "#C94035",
          navy: "#0F1E2D",
          white: "#FFFFFF",
        },
        canvas: "#FFFFFF",
        accent: "#C94035",
        "surface-inverse": "#0F1E2D",
        text: {
          primary: "#0F1E2D",
          secondary: "rgba(15, 30, 45, 0.70)",
          disabled: "rgba(15, 30, 45, 0.40)",
          inverse: "#FFFFFF",
        },
        border: {
          hairline: "rgba(15, 30, 45, 0.10)",
          strong: "#0F1E2D",
        },
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        body: ["var(--font-open-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "0.02em",
        eyebrow: "0.18em",
        button: "0.14em",
      },
      maxWidth: {
        shell: "1280px",
      },
      transitionDuration: {
        "600": "600ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
