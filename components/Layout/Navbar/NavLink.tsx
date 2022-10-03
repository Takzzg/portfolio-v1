import Link from "next/link";

interface Props {
	href: string;
	title: string;
	active: boolean;
}

const NavLink = ({ href, title, active }: Props) => {
	return (
		<Link href={href} passHref>
			<div className={`cursor-pointer p-4 ${active ? "bg-teal-600" : "text-white"}`}>{title}</div>
		</Link>
	);
};

export default NavLink;
