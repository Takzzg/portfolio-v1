import NavLink from "./NavLink/NavLink"
import styles from "./Navbar.module.scss"
import { useRouter } from "next/router"
import { useContext } from "react"
import { langCtx } from "../../../context/Lang"

const Navbar = () => {
    const router = useRouter()
    const languageCtx = useContext(langCtx)

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
                <NavLink href={"/"} title={languageCtx.lang.nav.homeLink} />
                <NavLink href={"/Conways"} title={"Conway's"} />
                <NavLink href={"/Pathfinding"} title={"Pathfinding"} />
                <NavLink href={"/Sorting"} title={"Sorting"} />
                <button
                    onClick={() => {
                        languageCtx.changeLang("es")
                    }}
                >
                    Español
                </button>
                <button
                    onClick={() => {
                        languageCtx.changeLang("en")
                    }}
                >
                    English
                </button>
            </div>
        </div>
    )
}

export default Navbar
