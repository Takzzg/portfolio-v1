export interface iTheme {
	main: string;
	secondary: string;
	background: string;
	text: string;
}

interface iThemes {
	light: iTheme;
	dark: iTheme;
}

const theme: iThemes = {
	light: {
		main: "#111",
		secondary: "#222",
		background: "#333",
		text: "#000",
	},
	dark: {
		main: "#111",
		secondary: "#222",
		background: "#333",
		text: "#fff",
	},
};

export default theme;
