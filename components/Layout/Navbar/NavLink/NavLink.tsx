import Link from "next/link"

import styles from "./NavLink.module.scss"

interface Props {
    href: string
    title: string
}

const NavLink = ({ href, title }: Props) => {
    return (
        <div className={styles.NavLink}>
            <Link href={href}>{title}</Link>
        </div>
    )
}

export default NavLink
