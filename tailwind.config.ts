import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#30291f", clay: "#b66e4d", cream: "#fbf7f0", sage: "#7b8065" }, fontFamily: { display: ["Georgia", "serif"] } } },
  plugins: []
};
export default config;