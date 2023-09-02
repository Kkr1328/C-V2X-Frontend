import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors:{
      'error_red' : "#CC0000",
      'warning_yellow' : "#FBC711",
      'accept_green' : "#00880E",
      'primary_blue' : "#17A5D3",
      'black' : "#000000",
      'white' : "#FFFFFF",
      'dark_text_grey' : "#555555",
      'light_text_grey' : "#979797",
      'dark_background_grey' : "#EEEEEE",
      'light_background_grey' : "#F2F2F2",
      'dark_background_blue' : "#D4ECF4",
      'light_background_blue' : "#E9F6FA",
    }
  },
  plugins: [],
}
export default config
