import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'custom-shadow': '0px 4px 4px 0px #00000040',
        'left-shadow': '-33px 46px 104px -34px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'custom-inner': '1px 0px 10px 0px #00000040 inset;',
        'top-shadow': '0px -4px 4px 0px #00000040;',
        'bottom-shadow': '0px 4px 4px 0px #00000040;',
        'filter-shadow' : '0px 4px 20.2px 0px #0000001F',
        'tabs-shadow': '0px 2px 2px 0px #00000040',
        'product-shadow':'0px 4px 23.9px 0px #0000001F',
        'image-shadow':'0px 4px 8px 0px #00000040',
        'features-shadow':'0px 4px 20.7px 0px #0000001F',
        'sign-button' : '0px 4px 4px 0px #FF000040 inset'
      }
    },
    screens:{
      'xs' :'425px',
      'sm' : '640px',
      'lg' : '1024px',
      'xl' : '1250px'
    }
  },
  plugins: [],
};
export default config;
