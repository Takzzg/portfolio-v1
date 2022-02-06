import { clamp } from "../utils"

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let parent: HTMLElement

let width: number
let height: number

let cellSize: number

let gutter = 0.5
let offsetX: number
let offsetY: number

let grid: number[][]

export const initCanvas = (
    _width: number,
    _height: number,
    _gutter: boolean
) => {
    canvas = <HTMLCanvasElement>document.getElementById("pathfindingCanvas")
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    parent = <HTMLElement>canvas.parentElement

    width = _width
    height = _height

    resizeCanvas()
}

export const toggleGrid = () => {
    gutter = gutter === 0 ? 0.5 : 0
    drawGrid()
}

const drawGrid = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    offsetX = (canvas.width - cellSize * width) / 2
    offsetY = (canvas.height - cellSize * height) / 2

    // console.log(offsetX, offsetY, cellSize, width, height)

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let posX = x * cellSize + offsetX + gutter
            let posY = y * cellSize + offsetY + gutter
            let w = cellSize - gutter * 2
            let h = cellSize - gutter * 2

            ctx.fillStyle = "white"
            ctx.fillRect(
                Math.floor(posX),
                Math.floor(posY),
                Math.floor(w),
                Math.floor(h)
            )
        }
    }
}

// ----- resize -----

export const resizeCanvas = (): void => {
    canvas.width = clamp(parent.clientWidth, 200, 1200)
    cellSize = canvas.width / width
    canvas.height = cellSize * height
    resizeGrid(width, height)
    drawGrid()
}

export const resizeGrid = (_width: number, _height: number) => {
    width = _width
    height = _height

    cellSize =
        Math.floor(canvas.width / width) < Math.floor(canvas.height / height)
            ? Math.floor(canvas.width / width)
            : Math.floor(canvas.height / height)

    grid = []
    for (let x = 0; x < width; x++) {
        grid[x] = []
        for (let y = 0; y < height; y++) {
            grid[x][y] = 0
        }
    }

    drawGrid()
}

// ----- block placement -----

export const getCoords = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (
        x > offsetX &&
        x < canvas.width - offsetX &&
        y > offsetY &&
        y < canvas.height - offsetY
    ) {
        let index_x = Math.floor((x - offsetX) / cellSize)
        let index_y = Math.floor((y - offsetY) / cellSize)

        console.log(`Clicked on coords: ${index_x}, ${index_y}`)
        return { index_x, index_y }
    }

    return false
}

export const placeBlock = (
    event: React.MouseEvent<HTMLCanvasElement>,
    selectedBlock: string
) => {
    console.log(selectedBlock)
    let clickCoords = getCoords(event)

    if (clickCoords) {
        switch (selectedBlock) {
            case "start":
                grid[(clickCoords.index_x, clickCoords.index_y)]
        }
    }
}
