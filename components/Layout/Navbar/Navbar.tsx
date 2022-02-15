import React from "react"
import NavLink from "./NavLink/NavLink"
import styles from "./Navbar.module.scss"
import { useRouter } from "next/router"

const Navbar = () => {
    const router = useRouter()

    return (
        <div
            className={styles.navCont}
            style={
                router.pathname === "/"
                    ? { position: "fixed" }
                    : { position: "sticky" }
            }
        >
            <div className={styles.navbar}>
                <NavLink href={"/"} title={"Home"} />
                <NavLink href={"/AntColony"} title={"Ant Colony"} />
                <NavLink href={"/Conways"} title={"Conway's"} />
                <NavLink href={"/Pathfinding"} title={"Pathfinding"} />
                <NavLink href={"/Sorting"} title={"Sorting"} />
            </div>
        </div>
    )
}

export default Navbar
