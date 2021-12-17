import { ReactNode } from "react"

import { Navbar } from "../index"

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Navbar />
            {children}
            <footer>Footer</footer>
        </div>
    )
}

export default Layout
