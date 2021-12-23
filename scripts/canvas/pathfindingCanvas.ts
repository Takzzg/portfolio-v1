import { clamp } from "../utils"

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let parent: HTMLElement

let width: number
let height: number

let cellSize: number
let gutter: number

let grid: number[][]

export const initCanvas = (
    _width: number,
    _height: number,
    _gutter: boolean
) => {
    canvas = <HTMLCanvasElement>document.getElementById("pathfindingCanvas")
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    parent = <HTMLElement>canvas.parentElement

    width = Math.round(_width)
    height = Math.round(_height)

    gutter = _gutter ? 1 : 0

    resizeCanvas()
}

export const resizeCanvas = (draw = true): void => {
    canvas.width = clamp(parent.clientWidth, 200, 1200)
    cellSize = Math.floor(canvas.width / width)
    canvas.height = cellSize * height
    drawGrid()
}

export const toggleGrid = () => {
    gutter = gutter === 0 ? 1 : 0
    drawGrid()
}

const drawGrid = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let offsetX = (canvas.width - cellSize * width) / 2
    let offsetY = (canvas.height - cellSize * height) / 2

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let posX = Math.floor(x * cellSize + offsetX) + gutter / 2

            let posY = Math.floor(y * cellSize + offsetY) + gutter / 2

            let w = Math.ceil(cellSize) - gutter
            let h = Math.ceil(cellSize) - gutter

            ctx.fillStyle = "white"
            ctx.fillRect(posX, posY, w, h)
        }
    }
}

export const resizeGrid = (_width: number, _height: number) => {
    width = Math.round(_width)
    height = Math.round(_height)

    cellSize =
        canvas.width / width < canvas.height / height
            ? canvas.width / width
            : canvas.height / height

    grid = []
    for (let x = 0; x < width; x++) {
        grid[x] = []
        for (let y = 0; y < height; y++) {
            grid[x][y] = 0
        }
    }

    drawGrid()

    // console.log(grid.length, grid[0].length)
    // console.log(cellSize)
}
