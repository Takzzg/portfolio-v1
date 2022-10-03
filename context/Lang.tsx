import React, { createContext, ReactNode, useState } from "react";

import en from "../translations/en";
import es from "../translations/es";

type Props = {
	children: ReactNode;
};

export interface iTranslation {
	languageCode: string;
	translations: {
		nav: {
			homeLink: string;
			antColonyLink: string;
			conwaysLink: string;
			pathfinding: string;
			sorting: string;
		};
	};
}

export const langCtx = createContext<{ lang: iTranslation; changeLang: Function }>({ lang: en, changeLang: () => {} });

const LangProvider = ({ children }: Props) => {
	const [lang, setLang] = useState<"en" | "es">("en");

	return (
		<langCtx.Provider
			value={{
				lang: lang === "en" ? en : es,
				changeLang: (val: "en" | "es") => setLang(val),
			}}
		>
			{children}
		</langCtx.Provider>
	);
};

export default LangProvider;
