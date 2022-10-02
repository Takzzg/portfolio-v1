import { ReactNode, useState } from "react";
import { GrClose } from "react-icons/gr";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	const [showDisclaimer, setShowDisclaimer] = useState(true);

	const Disclaimer = () => {
		return (
			<div className={"disclaimerCont"}>
				<div className={"disclaimer"}>
					<span className={"title"}>Disclaimer</span>
					<span className={"close"} onClick={() => setShowDisclaimer(false)}>
						<GrClose />
					</span>
					<hr />
					<p className={"body"}>
						This webpage is in early development; which means that some, if not most of the features, will
						not be working as intended or at all. Please consider reading the Readme.md from the{" "}
						<a href="https://github.com/Takzzg/portfolio">github repo</a> to learn more about the current
						state and development.
						<br />
						<br />
						Thanks for understanding, Guido.
					</p>
				</div>
			</div>
		);
	};

	return (
		<>
			{showDisclaimer && <Disclaimer />}
			<div className={"layout"}>
				<Navbar />
				{children}
				<Footer />
			</div>
		</>
	);
};

export default Layout;
