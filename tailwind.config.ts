import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
	theme: {
		extend: {
			colors: {
				main: '#FFDC58',
				mainAccent: '#ffc800', // not needed for shadcn components
				overlay: 'rgba(0,0,0,0.8)', // background color overlay for alert dialogs, modals, etc.

				// light mode
				bg: '#FEF2E8',
				text: '#000',
				border: '#000',

				// dark mode
				darkBg: '#374151',
				darkText: '#eeefe9',
				darkBorder: '#000',
				secondaryBlack: '#212121', // opposite of plain white, not used pitch black because borders and box-shadows are that color
			},
			borderRadius: {
				base: '5px'
			},
			boxShadow: {
				light: '6px 6px 0px 0px #000',
				dark: '6px 6px 0px 0px #000',
			},
			translate: {
				boxShadowX: '6px',
				boxShadowY: '6px',
				reverseBoxShadowX: '-6px',
				reverseBoxShadowY: '-6px',
			},
			fontWeight: {
				base: '500',
				heading: '700',
			},
		},
	},
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
