import Head from "next/head"
import { useEffect, useState } from "react"
import { FaFlag, FaFlagCheckered, FaRegFlag, FaRegSquare } from "react-icons/fa"
import Button from "../components/Button/Button"
import Slider from "../components/Slider/Slider"
import Title from "../components/Title/Title"

import * as CanvasScript from "../scripts/canvas/pathfindingCanvas"
import styles from "../styles/pages/Pathfinding.module.scss"

interface Props {}

const Pathfinding = (props: Props) => {
    const [width, Setwidth] = useState(64)
    const [height, setHeight] = useState(36)
    const [showGrid, setShowGrid] = useState(true)
    const [selectedBlock, setSelectedBlock] = useState("start")

    const BlockSelect = () => (
        <div className={styles.blocksContainer}>
            <Button
                value="Start"
                icon={<FaRegFlag />}
                onClick={() => {
                    setSelectedBlock("start")
                }}
                bg={selectedBlock === "start" ? "green" : "null"}
            />
            <Button
                value="Checkpoint"
                icon={<FaFlagCheckered />}
                onClick={() => {
                    setSelectedBlock("checkpoint")
                }}
                bg={selectedBlock === "checkpoint" ? "blue" : "null"}
            />
            <Button
                value="End"
                icon={<FaFlag />}
                onClick={() => {
                    setSelectedBlock("end")
                }}
                bg={selectedBlock === "end" ? "red" : "null"}
            />
            <Button
                value="Wall"
                icon={<FaRegSquare />}
                onClick={() => {
                    setSelectedBlock("wall")
                }}
                bg={selectedBlock === "wall" ? "darkslategray" : "null"}
            />
        </div>
    )

    useEffect(() => {
        CanvasScript.initCanvas(width, height, showGrid)
        window.addEventListener("resize", () => CanvasScript.resizeCanvas())
    }, [])

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
                    <div className={styles.canvasControls}>
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
                                defaultChecked={showGrid}
                            />
                            <label>Show Grid</label>
                        </div>
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
                        <BlockSelect />
                    </div>
                    <div id={styles.canvasContainer}>
                        <canvas
                            id="pathfindingCanvas"
                            onClick={(event) =>
                                CanvasScript.placeBlock(event, selectedBlock)
                            }
                        />
                    </div>
                    <div className={styles.controlsContainer}>
                        select solve step start/stop
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pathfinding
