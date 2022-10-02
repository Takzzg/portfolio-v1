import React, { ReactNode } from "react";
import styled from "styled-components";
import Divider from "./Divider";

type Props = {
	children: ReactNode;
	divider?: "mountains" | "bezier";
	color: string;
};

interface iStyledSection {
	bg: string;
}

const StyledSection = styled.div<iStyledSection>`
	position: relative;
	background-color: ${(props) => props.bg};

	.content {
		padding: 1rem;
	}
`;

const Section = ({ children, divider = "mountains", color }: Props) => {
	return (
		<StyledSection bg={color}>
			<Divider color={color} divider={divider} />
			<div className="content">{children}</div>
		</StyledSection>
	);
};

export default Section;
