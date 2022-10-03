import NavLink from "./NavLink";
import { useRouter } from "next/router";
import { useContext } from "react";
import { langCtx } from "../../../context/Lang";

const Navbar = () => {
	const router = useRouter();
	const languageCtx = useContext(langCtx);

	let currentLang = languageCtx.lang.languageCode;

	const buttons = [
		{ href: "/", title: languageCtx.lang.translations.nav.homeLink },
		{ href: "/Conways", title: languageCtx.lang.translations.nav.conwaysLink },
		{ href: "/Pathfinding", title: languageCtx.lang.translations.nav.pathfinding },
		{ href: "/Sorting", title: languageCtx.lang.translations.nav.sorting },
	];

	const languages = [
		{ code: "en", name: "English" },
		{ code: "es", name: "Español" },
	];

	return (
		<div className={"sticky top-0 z-10 flex items-center justify-center gap-4 bg-zinc-800"}>
			{buttons.map((b) => (
				<NavLink key={b.href} href={b.href} active={router.pathname === b.href} title={b.title} />
			))}

			{languages.map((lang) => (
				<button
					key={lang.code}
					className={`p-4 text-white ${currentLang === lang.code ? "bg-teal-700" : ""}`}
					onClick={() => {
						languageCtx.changeLang(lang.code);
					}}
				>
					{lang.name}
				</button>
			))}
		</div>
	);
};

export default Navbar;
