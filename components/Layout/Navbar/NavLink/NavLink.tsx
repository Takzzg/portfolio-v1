import Link from "next/link"

interface Props {
    href: string
    title: string
}

const NavLink = ({ href, title }: Props) => {
    return (
        <div>
            <Link href={href}>{title}</Link>
        </div>
    )
}

export default NavLink
