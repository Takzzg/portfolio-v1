import Head from "next/head"
import { useEffect, useState } from "react"
import Slider from "../components/Slider/Slider"
import Title from "../components/Title/Title"

import * as CanvasScript from "../scripts/canvas/pathfindingCanvas"
import styles from "../styles/pages/Pathfinding.module.scss"

interface Props {}

const Pathfinding = (props: Props) => {
    const [width, Setwidth] = useState(60)
    const [height, setHeight] = useState(30)
    const [showGrid, setShowGrid] = useState(true)

    useEffect(() => {
        CanvasScript.initCanvas(width, height, showGrid)
        window.addEventListener("resize", () => CanvasScript.resizeCanvas())
    }, [])

    // useEffect(() => {
    //     CanvasScript.toggleGrid()
    // }, [showGrid])

    useEffect(() => {
        CanvasScript.resizeGrid(width, height)
    }, [width, height])

    return (
        <>
            <Head>
                <title>Pathfinding Algorithms</title>
            </Head>

            <div className={styles.mainContainer}>
                <Title title="Sorting Algorithms Visualization" />

                <div id={styles.canvasMain}>
                    <div id={styles.canvasContainer}>
                        <canvas id="pathfindingCanvas" />
                    </div>
                    <div className={styles.controlsContainer}>
                        <Slider
                            label={"width"}
                            min={20}
                            max={100}
                            step={1}
                            value={width}
                            onChange={Setwidth}
                            onReset={Setwidth}
                        />
                        <Slider
                            label={"height"}
                            min={10}
                            max={50}
                            step={1}
                            value={height}
                            onChange={setHeight}
                            onReset={setHeight}
                        />
                        <div
                            className={styles.checkboxContainer}
                            onClick={() => {
                                setShowGrid(!showGrid)
                                CanvasScript.toggleGrid()
                            }}
                        >
                            <input
                                type="checkbox"
                                name="ShowGrid"
                                id="showGrid"
                                checked={showGrid}
                            />
                            <label>Show Grid</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pathfinding
