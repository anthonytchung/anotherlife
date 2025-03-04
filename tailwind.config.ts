import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#fffae7"
      },
      backgroundImage:{
        win7_bg: "url('/windows-7-background.jpg')",
        login_bg: "url('/login-background.jpg')"
      }
    },
  },
  plugins: [],
} satisfies Config;
