/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}', 
		
	],
	theme: {
		colors: {
			'primary-blue': '#312EB5',
			'primary-grey': '#181818'
		},
		extend: {
			
		},
	},
	plugins: [],
};
