import { useEffect, useState } from "react"
import Head from "next/head"

import * as CanvasScript from "../scripts/canvas/canvas"
import Algorithms from "../scripts/sorting/index"
import { AlgorithmsRefs } from "../scripts/sorting/algoRefs"

import {
    FaCheck,
    FaPlay,
    FaRandom,
    FaSignal,
    FaStepForward,
    FaStop
} from "react-icons/fa"

import styles from "../styles/pages/Sorting.module.scss"
import Slider from "../components/Slider/Slider"
import Title from "../components/Title/Title"
import Button from "../components/Button/Button"

const Sorting = () => {
    const [itemCount, setItemCount] = useState<number>(20)
    const [maxHeight, setMaxHeight] = useState<number>(100)
    const [animSpeed, setAnimSpeed] = useState<number>(100)

    const [animPalying, setAnimPlaying] = useState(false)
    const [algoName, setAlgoName] = useState<string>("bubble")

    useEffect(() => {
        CanvasScript.initCanvas(itemCount, maxHeight)
        window.addEventListener("resize", () => CanvasScript.resizeCanvas())
    }, [])

    useEffect(() => {
        stopAnimation()
        CanvasScript.updateValues(itemCount, maxHeight)
    }, [itemCount, maxHeight, animSpeed])

    const stopAnimation = () => {
        setAnimPlaying(false)
        CanvasScript.stopAnimation()
    }

    const runAlgo = (fn: string) => {
        stopAnimation()
        const script = Algorithms[algoName]
        CanvasScript.run(script[fn])
    }

    const animate = () => {
        if (animSpeed === 0) runAlgo("sort")
        else {
            setAnimPlaying(true)
            const script = Algorithms[algoName]
            CanvasScript.animate(script.step, animSpeed)
        }
    }

    const AlgorithmSelect = () => (
        <div>
            Sort using:&nbsp;
            <select
                className={styles.algoSelect}
                name="algorithms"
                id="algorithms"
                value={algoName}
                onChange={(event) => setAlgoName(event.target.value)}
            >
                {AlgorithmsRefs.map((algo) => (
                    <option key={algo.value} value={algo.value}>
                        {`${
                            algo.value[0].toUpperCase() + algo.value.slice(1)
                        } Sort`}
                    </option>
                ))}
            </select>
        </div>
    )

    return (
        <>
            <Head>
                <title>Sorting Algorithms</title>
            </Head>

            <div className={styles.mainContainer}>
                <Title title="Sorting Algorithms Visualization" />

                <div id={styles.canvasMain}>
                    <div id={styles.canvasContainer}>
                        <canvas id="sortingCanvas" />
                    </div>
                    <div className={styles.controlsContainer}>
                        <div className={styles.slidersContainer}>
                            <Slider
                                label={"Item Count"}
                                min={10}
                                max={200}
                                step={5}
                                value={itemCount}
                                onChange={setItemCount}
                                onReset={() => {
                                    setItemCount(20)
                                    CanvasScript.resetArray()
                                }}
                            />
                            <Slider
                                label={"Max Height"}
                                symbol="%"
                                min={10}
                                max={100}
                                step={5}
                                value={maxHeight}
                                onChange={setMaxHeight}
                                onReset={() => {
                                    setMaxHeight(100)
                                    CanvasScript.resetArray()
                                }}
                            />
                            <Slider
                                label={"Animation Speed"}
                                symbol="ms"
                                min={0}
                                max={300}
                                step={10}
                                value={animSpeed}
                                onChange={setAnimSpeed}
                                onReset={() => setAnimSpeed(100)}
                            />
                        </div>

                        <AlgorithmSelect />

                        <div className={styles.actionsContainer}>
                            <Button
                                value="Sort"
                                icon={<FaSignal />}
                                onClick={() => runAlgo("sort")}
                                bg="blue"
                            />
                            <Button
                                value="Step"
                                icon={<FaStepForward />}
                                onClick={() => runAlgo("step")}
                                bg="royalblue"
                            />
                            {animPalying ? (
                                <Button
                                    value="Stop"
                                    icon={<FaStop />}
                                    onClick={() => stopAnimation()}
                                    bg="red"
                                />
                            ) : (
                                <Button
                                    value="Start"
                                    icon={<FaPlay />}
                                    onClick={() => animate()}
                                    bg="green"
                                />
                            )}
                            <Button
                                value="Shuffle"
                                icon={<FaRandom />}
                                onClick={() => {
                                    stopAnimation()
                                    CanvasScript.resetArray()
                                }}
                                bg="orangered"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sorting
