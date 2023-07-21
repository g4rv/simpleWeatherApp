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
		},
	},
	plugins: [],
};
