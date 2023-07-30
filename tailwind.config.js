/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['SFProDisplay', ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				'3xl': ['2.125rem', '1.2'],
			},
            backgroundSize: {
                '50%': '50%'
            },
            boxShadow: {
                'forecastItemShadow': '5px 4px 10px 0px rgba(0, 0, 0, 0.25), 1px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
            }
		},
	},
	plugins: [],
};
