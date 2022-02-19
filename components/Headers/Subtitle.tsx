import React, { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Subtitle = ({ children }: Props) => {
    return (
        <div
            style={{
                textAlign: "center",
                fontSize: "2rem"
            }}
        >
            {children}
        </div>
    )
}

export default Subtitle
