import styles from "./Title.module.scss"

interface Props {
    title: string
}

const Title = (props: Props) => {
    return <div className={styles.title}>{props.title}</div>
}

export default Title
