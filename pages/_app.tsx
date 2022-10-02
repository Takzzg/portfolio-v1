import type { AppProps } from "next/app";

import Layout from "../components/Layout/Layout";
import LangProvider from "../context/Lang";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<LangProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</LangProvider>
	);
}

export default MyApp;
