import { clamp } from "../utils"
import Cell from "../pathfinding/cell"

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let parent: HTMLElement

let gridWidth: number
let gridHeight: number

let cellSize: number

let gutter = 0.5
let offsetX: number
let offsetY: number

let grid: Cell[][]

interface cellCoord {
    x: number
    y: number
}

let startCell: cellCoord
let endCell: cellCoord
let checkpoint: cellCoord

export const initCanvas = (_width: number, _height: number) => {
    canvas = <HTMLCanvasElement>document.getElementById("pathfindingCanvas")
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    parent = <HTMLElement>canvas.parentElement

    gridWidth = _width
    gridHeight = _height

    clearGrid()
    resizeCanvas()
}

// ----- draw grid -----

export const toggleGrid = () => {
    gutter = gutter === 0 ? 0.5 : 0
    drawGrid()
}

const drawGrid = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    offsetX = (canvas.width - cellSize * gridWidth) / 2
    offsetY = (canvas.height - cellSize * gridHeight) / 2

    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            let posX = x * cellSize + offsetX + gutter
            let posY = y * cellSize + offsetY + gutter
            let w = cellSize - gutter * 2
            let h = cellSize - gutter * 2

            ctx.fillStyle = grid[x][y].getColor()
            ctx.fillRect(
                Math.floor(posX),
                Math.floor(posY),
                Math.floor(w),
                Math.floor(h)
            )
        }
    }
}

export const clearGrid = () => {
    grid = []

    for (let x = 0; x < gridWidth; x++) {
        grid[x] = []
        for (let y = 0; y < gridHeight; y++) {
            grid[x][y] = new Cell(x, y, "empty")
        }
    }

    startCell = {
        x: 4,
        y: Math.ceil(gridHeight / 2)
    }
    endCell = {
        x: gridWidth - 5,
        y: Math.ceil(gridHeight / 2)
    }
    checkpoint = {
        x: -1,
        y: -1
    }

    grid[startCell.x][startCell.y].setType("start")
    grid[endCell.x][endCell.y].setType("end")

    drawGrid()
}

// ----- resize -----

export const resizeCanvas = (): void => {
    canvas.width = clamp(parent.clientWidth, 200, 1200)
    cellSize = canvas.width / gridWidth
    canvas.height = cellSize * gridHeight

    clampCellSize()
    drawGrid()
}

export const resizeGrid = (_width: number, _height: number) => {
    gridWidth = _width
    gridHeight = _height

    clampCellSize()
    clearGrid()
}

const clampCellSize = () => {
    cellSize =
        Math.floor(canvas.width / gridWidth) <
        Math.floor(canvas.height / gridHeight)
            ? Math.floor(canvas.width / gridWidth)
            : Math.floor(canvas.height / gridHeight)
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
    let clickCoords = getCoords(event)

    if (!clickCoords) {
        console.log("Can't place a block outside the grid")
        return
    }

    switch (selectedBlock) {
        case "start":
            if (
                clickCoords.index_x === checkpoint.x &&
                clickCoords.index_y === checkpoint.y
            )
                checkpoint = { x: -1, y: -1 }
            grid[startCell.x][startCell.y].setType("empty")
            startCell = {
                x: clickCoords.index_x,
                y: clickCoords.index_y
            }
            grid[startCell.x][startCell.y].setType("start")
            break

        case "end":
            if (
                clickCoords.index_x === checkpoint.x &&
                clickCoords.index_y === checkpoint.y
            )
                checkpoint = { x: -1, y: -1 }
            grid[endCell.x][endCell.y].setType("empty")
            endCell = {
                x: clickCoords.index_x,
                y: clickCoords.index_y
            }
            grid[endCell.x][endCell.y].setType("end")
            break

        case "checkpoint":
            if (
                (clickCoords.index_x !== startCell.x ||
                    clickCoords.index_y !== startCell.y) &&
                (clickCoords.index_x !== endCell.x ||
                    clickCoords.index_y !== endCell.y)
            ) {
                if (checkpoint.x !== -1)
                    grid[checkpoint.x][checkpoint.y].setType("empty")
                checkpoint = {
                    x: clickCoords.index_x,
                    y: clickCoords.index_y
                }
                grid[checkpoint.x][checkpoint.y].setType("checkpoint")
            }
            break

        default:
            if (
                (clickCoords.index_x !== startCell.x ||
                    clickCoords.index_y !== startCell.y) &&
                (clickCoords.index_x !== endCell.x ||
                    clickCoords.index_y !== endCell.y)
            ) {
                if (
                    clickCoords.index_x === checkpoint.x &&
                    clickCoords.index_y == checkpoint.y
                )
                    checkpoint = { x: -1, y: -1 }
                grid[clickCoords.index_x][clickCoords.index_y].setType(
                    selectedBlock
                )
            }
            break
    }

    drawGrid()
}
