import type { Config } from 'tailwindcss';

const config: Config = {
	important: '#__next',
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
		fontFamily: {
			istok: ['var(--font-istok-web)'],
		},
		fontSize: {
			h1: ['40px', { lineHeight: '57.6px', fontWeight: '700' }],
			h2: ['32px', { lineHeight: '46.1px', fontWeight: '700' }],
			h3: ['24px', { lineHeight: '34.5px', fontWeight: '700' }],
			h4: ['20px', { lineHeight: '28.8px', fontWeight: '700' }],
			h5: ['16px', { lineHeight: '23px', fontWeight: '700' }],
			h6: ['12px', { lineHeight: '14.5px', fontWeight: '700' }],
			p1: ['16px', { lineHeight: '23px', fontWeight: '400' }],
			p2: ['12px', { lineHeight: '17.3px', fontWeight: '400' }],
			p3: ['10px', { lineHeight: '14.4px', fontWeight: '400' }],
		},
		colors: {
			black: '#000000',

			white: '#FFFFFF',

			error_red: '#CC0000',
			dark_error_red: '#B50000',
			dark_background_red: '#FFDDDD',

			warning_yellow: '#FBC711',
			dark_warning_yellow: '#EFBE10',

			active_green: '#00880E',
			dark_active_green: '#00700B',
			dark_background_green: '#bee8c6',

			primary_blue: '#17A5D3',
			dark_primary_blue: '#1596D0',
			dark_background_blue: '#D4ECF4',
			light_background_blue: '#E9F6FA',

			inactive_grey: '#D8D8D8',
			dark_text_grey: '#555555',
			light_text_grey: '#979797',
			dark_background_grey: '#EEEEEE',
			light_background_grey: '#F2F2F2',
		},
		spacing: {
			none: '0',
			'4': '4px',
			'8': '8px',
			'12': '12px',
			'16': '16px',
			'24': '24px',
			'32': '32px',
			'40': '40px',
			'44': '44px',
			'48': '48px',
			'64': '64px',
			'72': '72px',
			'84': '84px',
			'120': '120px',
			'272': '272px',
			'336': '336px',
			'280': '280px',
			'300': '300px',
			'600': '600px',
		},
		borderRadius: {
			none: '0px',
			sm: '5px',
			md: '10px',
			lg: '15px',
		},
	},
	plugins: [],
};
export default config;
