import React, { useEffect } from "react"
import Button from "../Button/Button"
import { FaRandom } from "react-icons/fa"
import { drawMountains } from "./script"
import styles from "./Mountains.module.scss"

type Props = {
    peakCount?: number
    color?: string
}

const Moutains = ({ peakCount = 7, color = "#14191f" }: Props) => {
    useEffect(() => {
        drawMountains(peakCount, color)
        window.addEventListener("resize", () => drawMountains(peakCount, color))
    }, [])

    return (
        <div className={styles.mountainsCont}>
            <div className={styles.mountainsBtn}>
                <Button
                    icon={<FaRandom />}
                    onClick={() => drawMountains(peakCount, color)}
                    bg="transparent"
                />
            </div>
            <canvas id="mountains" />
        </div>
    )
}

export default Moutains
