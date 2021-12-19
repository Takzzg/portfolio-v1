import React from "react"
import NavLink from "./NavLink/NavLink"
import styles from "./Navbar.module.scss"

interface Props {}

const Navbar = (props: Props) => {
    return (
        <div className={styles.Navbar}>
            <NavLink href={"/"} title={"Home"} />
            <NavLink href={"/AntColony"} title={"Ant Colony Simulation"} />
            <NavLink href={"/Conways"} title={"Conway's Game of Life"} />
            <NavLink
                href={"/Pathfinding"}
                title={"Pathfinding Visualization"}
            />
            <NavLink href={"/Sorting"} title={"Sorting Visualization"} />
        </div>
    )
}

export default Navbar
