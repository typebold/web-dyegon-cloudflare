/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
                primary: '#05393D',
                black: '#022D40',
				red: '#E13F3F',
            },
			fontWeight: {
                light: '300',
                medium: '500',
                bold: '700'
            },
			screens: {
				xs: '510px',
				xxs: '420px'
			}
		},
	},
	plugins: [],
}
