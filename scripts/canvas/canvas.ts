import { clamp } from "../utils"

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let parent: HTMLElement

let array: number[]

let maxHeight: number
let itemCount: number

export const checkSolved = () => {
    let solved = true
    for (let i = 0; i < array.length - 1; i++)
        if (array[i] > array[i + 1]) {
            solved = false
            break
        }
    return solved
}

export const updateValues = (_itemCount: number, _maxHeight: number) => {
    maxHeight = Math.round(_maxHeight)
    itemCount = Math.round(_itemCount)
    resetArray()
}

export const resizeCanvas = (draw = true): void => {
    canvas.width = clamp(parent.clientWidth, 200, 600)
    canvas.height = canvas.width
    if (draw) drawBars()
}

export const resetArray = (draw = true) => {
    array = []
    for (let i = 0; i < itemCount; i++)
        array[i] = Math.random() * maxHeight + 0.5
    if (draw) drawBars()
}

export const initCanvas = (_itemCount: number, _maxHeight: number) => {
    canvas = <HTMLCanvasElement>document.getElementById("sortingCanvas")
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    parent = <HTMLElement>canvas.parentElement

    maxHeight = Math.round(_maxHeight)
    itemCount = Math.round(_itemCount)

    resetArray(false)
    resizeCanvas(false)
    drawBars()
}

const clearCanvas = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const drawBars = () => {
    clearCanvas()
    const padding = 50

    for (let i = 0; i < array.length; i++) {
        let x = Math.ceil(
            padding + ((canvas.width - padding * 2) / array.length) * i
        )
        let y = Math.ceil(canvas.height - padding)
        let w = Math.ceil((canvas.width - padding * 2) / array.length)
        let h = Math.ceil(-((canvas.height - padding * 2) * (array[i] / 100)))
        let hsl = 255 * (array[i] / maxHeight)

        ctx.fillStyle = "hsl(" + hsl + ",80%,50%)"
        ctx.fillRect(x, y, w, h)
    }
}

export const run = (algoMethod: Function) => {
    if (checkSolved()) alert("done")
    else {
        algoMethod(array)
        drawBars()
    }
}
