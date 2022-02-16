import React, { ReactNode } from "react"
import Divider from "./Divider"

type Props = {
    children: ReactNode
    divider?: "mountains" | "bezier"
    color: string
}

const Section = ({ children, divider = "mountains", color }: Props) => {
    return (
        <div style={{ backgroundColor: color, position: "relative" }}>
            <Divider color={color} divider={divider} />
            {children}
        </div>
    )
}

export default Section
