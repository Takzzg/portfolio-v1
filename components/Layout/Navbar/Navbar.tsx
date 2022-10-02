import NavLink from "./NavLink";
import { useRouter } from "next/router";
import { useContext } from "react";
import { langCtx } from "../../../context/Lang";
import styled from "styled-components";

const StyledNavBar = styled.div`
	top: 0;
	z-index: 10;
	position: sticky;

	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: center;
`;

const Navbar = () => {
	const router = useRouter();
	const languageCtx = useContext(langCtx);

	const buttons = [
		{ href: "/", title: languageCtx.lang.nav.homeLink },
		{ href: "/Conways", title: "Conway's" },
		{ href: "/Pathfinding", title: "Pathfinding" },
		{ href: "/Sorting", title: "Sorting" },
	];

	return (
		<StyledNavBar>
			{buttons.map((b, i) => (
				<NavLink
					key={b.href}
					href={b.href}
					active={router.pathname === b.href}
					title={b.title}
					// color={`hsl(${(255 / buttons.length) * i}, 100%, 25%)`}
				/>
			))}

			<button
				onClick={() => {
					languageCtx.changeLang("es");
				}}
			>
				Español
			</button>
			<button
				onClick={() => {
					languageCtx.changeLang("en");
				}}
			>
				English
			</button>
		</StyledNavBar>
	);
};

export default Navbar;
