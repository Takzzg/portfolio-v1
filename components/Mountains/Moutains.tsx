import React, { useEffect, useRef } from "react"
import Button from "../Button/Button"
import { FaRandom } from "react-icons/fa"
import { drawMountains } from "./script"
import styles from "./Mountains.module.scss"

type Props = {
    peakCount?: number
}

const Moutains = ({ peakCount = 7 }: Props) => {
    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        drawMountains(canvas.current as HTMLCanvasElement, peakCount)
        window.addEventListener("resize", () =>
            drawMountains(canvas.current!, peakCount)
        )
    }, [])

    return (
        <div className={styles.mountainsCont}>
            <div className={styles.mountainsBtn}>
                <Button
                    icon={<FaRandom />}
                    onClick={() => drawMountains(canvas.current!, peakCount)}
                    bg="transparent"
                />
            </div>
            <canvas ref={canvas} />
        </div>
    )
}

export default Moutains
