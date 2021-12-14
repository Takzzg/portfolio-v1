import { ReactNode } from "react"

import { Navbar } from "../index"

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            {children}
            <footer>Footer</footer>
        </>
    )
}

export default Layout
