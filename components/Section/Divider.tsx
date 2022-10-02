import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { FaRandom } from "react-icons/fa";
import { drawDivider } from "./script";
import styles from "./Divider.module.scss";

type Props = {
	color: string;
	divider: "mountains" | "bezier" | "bezierInverted";
};

const Divider = ({ color, divider: _divider }: Props) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [divider, setDivider] = useState(_divider);

	let draw = () => {
		drawDivider(canvas.current!, color, divider);
	};

	const handleClick = () => {
		if (divider === "bezier") setDivider("bezierInverted");
		else if (divider === "bezierInverted") setDivider("bezier");
		else draw();
	};

	useEffect(() => {
		window.addEventListener("resize", () => draw());
	}, []);

	useEffect(() => {
		draw = () => drawDivider(canvas.current!, color, divider);
		draw();
	}, [canvas.current, divider]);

	return (
		<div className={styles.mountainsCont}>
			<div className={styles.mountainsBtn}>
				<Button
					icon={<FaRandom />}
					onClick={handleClick}
					bg="transparent"
				/>
			</div>
			<canvas ref={canvas} />
		</div>
	);
};

export default Divider;
