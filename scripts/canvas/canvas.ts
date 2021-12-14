let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let parent: HTMLElement

let array: number[]

let maxHeight: number
let itemCount: number

export const updateValues = (_itemCount: number, _maxHeight: number) => {
    maxHeight = Math.round(_maxHeight)
    itemCount = Math.round(_itemCount)
    resetArray()
}

export const resizeCanvas = (): void => {
    canvas.width = clamp(parent.clientWidth, 200, 600)
    canvas.height = canvas.width
    drawBars()
}

export const resetArray = () => {
    array = []

    for (let i = 0; i < itemCount; i++) {
        array[i] = Math.random() * (maxHeight - 0.1 + 0.1) + 0.1
    }

    stopAnimation()
    drawBars()
}

const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max)

export const initCanvas = (_itemCount: number, _maxHeight: number) => {
    canvas = <HTMLCanvasElement>document.getElementById("sortingCanvas")
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    parent = <HTMLElement>canvas.parentElement
    maxHeight = Math.round(_maxHeight)
    itemCount = Math.round(_itemCount)

    resetArray()
    resizeCanvas()
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

        ctx.fillStyle = "hsl(" + hsl + ",100%,50%)"
        ctx.fillRect(x, y, w, h)
    }
}

export const run = (algoMethod: Function) => {
    stopAnimation()
    let nextFrame = algoMethod(array)
    if (nextFrame == "done") alert("done")
    else {
        array = nextFrame
        drawBars()
    }
}

let animation: NodeJS.Timeout

export const animate = (algo: Function) => {
    animation = setInterval(() => {
        let nextFrame = algo(array)

        if (nextFrame == "done") stopAnimation()
        else {
            array = nextFrame
            drawBars()
        }
    }, 100)
}

export const stopAnimation = () => {
    clearInterval(animation)
}
