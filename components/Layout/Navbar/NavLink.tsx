import Link from "next/link";
import styled from "styled-components";

interface StyledNavLinkProps {
	active: boolean;
}

const StyledNavLink = styled.div<StyledNavLinkProps>`
	padding: 1rem;
	cursor: pointer;
	background-color: ${(props) => props.active && props.theme.main};
`;

interface Props {
	href: string;
	title: string;
	active: boolean;
	color?: string;
}

const NavLink = ({ href, title, active, color }: Props) => {
	return (
		<Link href={href} passHref>
			<StyledNavLink active={active}>{title}</StyledNavLink>
		</Link>
	);
};

export default NavLink;
