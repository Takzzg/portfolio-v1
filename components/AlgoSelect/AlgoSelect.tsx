import { useState } from "react"
import { AlgoRefProps } from "./algoRefs"
import styles from "./AlgoSelect.module.scss"

interface Props {
    action: string
    refs: AlgoRefProps[]
    postfix?: string
}

const AlgorithmSelect = (props: Props) => {
    const { action, refs, postfix = "" } = props

    const [algoName, setAlgoName] = useState(refs[0].value)

    return (
        <div className={styles.selectContainer}>
            {action} using:&nbsp;
            <select
                className={styles.algoSelect}
                name="algorithms"
                id="algorithms"
                value={algoName}
                onChange={(event) => setAlgoName(event.target.value)}
            >
                {refs.map((algo) => (
                    <option key={algo.value} value={algo.value}>
                        {algo.value[0].toUpperCase() +
                            algo.value.slice(1) +
                            " " +
                            postfix}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default AlgorithmSelect
