import Link from "next/link";

interface Props {
	href: string;
	title: string;
	active: boolean;
	color?: string;
}

const NavLink = ({ href, title, active, color }: Props) => {
	const bg = active ? (color ? color : "red") : "";

	return (
		<Link href={href} passHref>
			<div className={"button"} style={{ backgroundColor: bg }}>
				{title}
			</div>
		</Link>
	);
};

export default NavLink;
