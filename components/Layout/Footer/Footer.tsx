interface Props {}

const Footer = (props: Props) => {
	return (
		<div className={"footer"}>
			<div className={"technologies"}>
				This project was created using:
				<div className={"techIcons"}>Next.js Typescript Sass React-icons</div>
			</div>
			<div className={"linkContainer"}>
				Check out the source code{" "}
				<span className={"repoLink"}>
					<a target={"_blank"} rel={"noreferrer"} href={"https://github.com/Takzzg/portfolio"}>
						here
					</a>
				</span>
			</div>
		</div>
	);
};

export default Footer;
