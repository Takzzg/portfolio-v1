import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

const Title = ({ children }: Props) => {
    return (
        <div
            style={{
                textAlign: "center",
                fontSize: "2.5em",
                padding: "1rem"
            }}
        >
            {children}
        </div>
    )
}

export default Title