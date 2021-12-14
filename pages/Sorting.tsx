import { useEffect, useState } from "react"
import Head from "next/head"

import styles from "../styles/pages/Sorting.module.scss"

import * as CanvasScript from "../scripts/canvas/canvas"

import Algorithms from "../scripts/sorting/index"

interface AlgoProps {
    text: string
    name: string
}

const Sorting = () => {
    const [itemCount, setItemCount] = useState<number>(100)
    const [maxHeight, setMaxHeight] = useState<number>(50)
    const [algo, setAlgo] = useState<AlgoProps>({
        text: "Bubble Sort",
        name: "bubble"
    })

    const AlgoBtn = ({ text, name }: AlgoProps) => (
        <input
            className={styles.algoBtn}
            type="button"
            value={text}
            onClick={() => setAlgo({ text, name })}
        />
    )

    const runAlgo = (fn: string) => {
        const script = Algorithms[algo.name]
        script
            ? CanvasScript.run(script[fn])
            : alert(`${algo.name} not implemented`)
    }

    const stepAlgo = () => {
        const script = Algorithms[algo.name]
        script
            ? CanvasScript.run(script.step)
            : alert(`${algo.name} not implemented`)
    }

    const animate = () => {
        const script = Algorithms[algo.name]
        script
            ? CanvasScript.animate(script.step)
            : alert(`${algo.name} not implemented`)
    }

    useEffect(() => {
        CanvasScript.initCanvas(itemCount, maxHeight)
        window.addEventListener("resize", () => CanvasScript.resizeCanvas())
    }, [])

    useEffect(() => {
        CanvasScript.updateValues(itemCount, maxHeight)
    }, [itemCount, maxHeight])

    const resetSliders = () => {
        setItemCount(100)
        setMaxHeight(50)

        CanvasScript.resetArray()
    }

    return (
        <>
            <Head>
                <title>Sorting Algorithms</title>
            </Head>

            <div className={styles.mainContainer}>
                <div>Sorting Algorithms Visualization</div>
                <div className={styles.algoBtnContainer}>
                    <AlgoBtn text={"Bubble Sort"} name="bubble" />
                    <AlgoBtn text={"Selection Sort"} name="selection" />
                    <AlgoBtn text={"Insertion Sort"} name="" />
                    <AlgoBtn text={"Quick Sort"} name="" />
                    <AlgoBtn text={"Merge Sort"} name="" />
                    <AlgoBtn text={"Bucket Sort"} name="" />
                    <AlgoBtn text={"Shell Sort"} name="" />
                    <AlgoBtn text={"Heap Sort"} name="" />
                </div>
                <div id={styles.canvasMain}>
                    <div id={styles.canvasContainer}>
                        <canvas id="sortingCanvas" />
                    </div>
                    <div className={styles.controlsContainer}>
                        <div>Selected Algorithm: {algo.text}</div>
                        <div className={styles.slidersContainer}>
                            <div>item count</div>
                            <input
                                type="range"
                                min="10"
                                max="200"
                                value={itemCount}
                                onChange={(event) => {
                                    setItemCount(parseInt(event.target.value))
                                    CanvasScript.resetArray()
                                }}
                            />
                            <div>max height</div>
                            <input
                                type="range"
                                min="5"
                                max="100"
                                value={maxHeight}
                                onChange={(event) => {
                                    setMaxHeight(parseInt(event.target.value))
                                    CanvasScript.resetArray()
                                }}
                            />
                            <input
                                type="button"
                                value="Reset Sliders"
                                onClick={resetSliders}
                            />
                        </div>
                        <div className={styles.actionsContainer}>
                            <input
                                type="button"
                                value="Stop"
                                onClick={() => CanvasScript.stopAnimation()}
                            />
                            <input
                                type="button"
                                value="Step"
                                onClick={stepAlgo}
                            />
                            <input
                                type="button"
                                value="Run"
                                onClick={() => runAlgo("sort")}
                            />
                            <input
                                type="button"
                                value="Animate"
                                onClick={() => animate()}
                            />
                            <input
                                type="button"
                                value="Shuffle"
                                onClick={() => CanvasScript.resetArray()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sorting
