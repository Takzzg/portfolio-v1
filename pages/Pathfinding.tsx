import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import {
    FaCheck,
    FaEraser,
    FaFlag,
    FaFlagCheckered,
    FaPlay,
    FaRandom,
    FaRedo,
    FaRegFlag,
    FaRegSquare,
    FaStop
} from "react-icons/fa"
import { pathfindingAlgos } from "../components/AlgoSelect/algoRefs"
import AlgorithmSelect from "../components/AlgoSelect/AlgoSelect"
import Button from "../components/Button/Button"
import Slider from "../components/Slider/Slider"
import Title from "../components/Headers/Title"

import * as CanvasScript from "../scripts/canvas/pathfindingCanvas"
import { CellHistory } from "../scripts/pathfinding/breadth"
import styles from "../styles/pages/Pathfinding.module.scss"

interface Props {}

const Pathfinding = (props: Props) => {
    const [width, Setwidth] = useState(64)
    const [height, setHeight] = useState(36)
    const [showGrid, setShowGrid] = useState(true)
    const [selectedBlock, setSelectedBlock] = useState("start")
    const [painting, setPainting] = useState(false)

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
            <Button
                value="Empty"
                icon={<FaEraser />}
                onClick={() => {
                    setSelectedBlock("empty")
                }}
                bg={selectedBlock === "empty" ? "white" : "null"}
                color={selectedBlock === "empty" ? "black" : "null"}
            />
        </div>
    )

    useEffect(() => {
        CanvasScript.initCanvas(width, height)
        window.onresize = CanvasScript.resizeCanvas
    }, [])

    useEffect(() => {
        CanvasScript.resizeGrid(width, height)
    }, [width, height])

    const solution = useRef<
        | {
              history: CellHistory[]
              path: {
                  x: number
                  y: number
              }[]
          }
        | undefined
    >(undefined)
    const [animPlaying, setAnimPlaying] = useState(false)
    const animation = useRef<NodeJS.Timer | null>(null)

    const animate = () => {
        if (!solution.current) {
            CanvasScript.resetVisited()
            solution.current = CanvasScript.solveGrid()
        }

        setAnimPlaying(true)
        animation.current = setInterval(() => {
            if (solution.current?.history.length) {
                let next = solution.current.history.shift()?.current as {
                    x: number
                    y: number
                }
                if (CanvasScript.updateBlock(next.x, next.y, undefined, true))
                    solution.current.history = []
                return
            } else if (solution.current?.path.length) {
                let next = solution.current?.path.shift() as {
                    x: number
                    y: number
                }
                CanvasScript.updateBlock(next.x, next.y, "path")
                return
            } else resetSolution()
        }, 25)
    }

    const stopAnim = () => {
        setAnimPlaying(false)
        animation.current && clearInterval(animation.current)
    }

    const resetSolution = () => {
        stopAnim()
        solution.current = undefined
    }

    const solve = () => {
        solution.current = CanvasScript.solveGrid()
        while (solution.current?.history.length) {
            let next = solution.current.history.shift()?.current as {
                x: number
                y: number
            }
            if (CanvasScript.updateBlock(next.x, next.y, undefined, true))
                solution.current.history = []
        }
        while (solution.current?.path.length) {
            let next = solution.current?.path.shift() as {
                x: number
                y: number
            }
            CanvasScript.updateBlock(next.x, next.y, "path")
        }
    }

    return (
        <>
            <Head>
                <title>Pathfinding Algorithms</title>
            </Head>

            <div className={styles.mainContainer}>
                <Title>Pathfinding Algorithms Visualization</Title>

                <div id={styles.canvasMain}>
                    <div className={styles.toolbarTop}>
                        <Button
                            value="Randomize"
                            icon={<FaRandom />}
                            onClick={() => {
                                resetSolution()
                                CanvasScript.generateMaze()
                            }}
                            bg={"orange"}
                        />
                        <Button
                            value="Reset"
                            icon={<FaRedo />}
                            onClick={() => {
                                resetSolution()
                                CanvasScript.clearGrid()
                            }}
                            bg={"red"}
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
                    </div>
                    <div id={styles.canvasContainer}>
                        <canvas
                            id="pathfindingCanvas"
                            onMouseDown={(event) => {
                                setPainting(true)
                                CanvasScript.placeBlock(event, selectedBlock)
                                CanvasScript.setLastMousePos(event)
                            }}
                            onMouseUp={() => {
                                setPainting(false)
                                CanvasScript.resetLastMousePos()
                            }}
                            onMouseLeave={() => {
                                setPainting(false)
                                CanvasScript.resetLastMousePos()
                            }}
                            onMouseMove={(event) => {
                                if (painting) {
                                    CanvasScript.placeBlock(
                                        event,
                                        selectedBlock
                                    )
                                    CanvasScript.setLastMousePos(event)
                                }
                            }}
                        />
                    </div>
                    <div className={styles.toolbarBottom}>
                        <div className={styles.algoControls}>
                            <AlgorithmSelect
                                action={"Solve"}
                                refs={pathfindingAlgos}
                            />
                            <Button
                                value="Clear"
                                icon={<FaEraser />}
                                onClick={() => {
                                    resetSolution()
                                    CanvasScript.resetVisited()
                                }}
                                bg={"orangered"}
                            />
                            <Button
                                value="Solve"
                                icon={<FaCheck />}
                                onClick={() => {
                                    resetSolution()
                                    CanvasScript.resetVisited()
                                    solve()
                                }}
                                bg={"blue"}
                            />
                            {animPlaying ? (
                                <Button
                                    value="Stop"
                                    icon={<FaStop />}
                                    onClick={() => {
                                        stopAnim()
                                    }}
                                    bg={"red"}
                                />
                            ) : (
                                <Button
                                    value="Animate"
                                    icon={<FaPlay />}
                                    onClick={() => {
                                        animate()
                                    }}
                                    bg={"green"}
                                />
                            )}
                        </div>
                        <div className={styles.palette}>
                            <BlockSelect />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pathfinding
