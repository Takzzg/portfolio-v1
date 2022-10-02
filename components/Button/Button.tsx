import { ReactNode } from "react";

interface Props {
	value?: string;
	icon: ReactNode;
	onClick: Function;
	bg: string;
	span?: number;
	color?: string;
}

const Button = (props: Props) => (
	<div
		className={"buttonContainer"}
		style={{
			color: props.color,
			backgroundColor: props.bg,
			gridColumn: props.span ? `span ${props.span}` : "",
		}}
		onClick={() => props.onClick()}
	>
		{props.icon}
		{props.value}
	</div>
);

export default Button;
