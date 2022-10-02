import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../styled/global";
import theme, { iTheme } from "../styled/theme";

import Layout from "../components/Layout/Layout";
import LangProvider from "../context/Lang";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const [selectedTheme, setSelectedTheme] = useState<iTheme>(theme.dark);

	return (
		<ThemeProvider theme={selectedTheme}>
			<LangProvider>
				<GlobalStyle />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</LangProvider>
		</ThemeProvider>
	);
}

export default MyApp;
