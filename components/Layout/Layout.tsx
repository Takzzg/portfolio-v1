import { ReactNode } from "react";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className={"layout"}>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
