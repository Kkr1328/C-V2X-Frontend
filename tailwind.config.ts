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
    fontSize : {
      'h1' : ['40px', {fontWeight: '700'}],
      'h2' : ['36px', {fontWeight: '700'}],
      'h3' : ['24px', {fontWeight: '700'}],
      'h4' : ['16px', {fontWeight: '700'}],
      'p1' : ['18px', {fontWeight: '400'}],
      'p2' : ['16px', {fontWeight: '400'}],
      'p3' : ['14px', {fontWeight: '400'}],
      'p4' : ['12px', {fontWeight: '400'}],
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
    },
    spacing : {
      'none' : '0',
      '4' : '4px',
      '8' : '8px',
      '16' : '16px',
      '24' : '24px',
      '32' : '32px',
      '64' : '64px',
    },
    borderRadius : {
      'none' : '0px',
      'sm' : '5px',
      'lg' : '15px'
    }
  },
  plugins: [],
}
export default config
