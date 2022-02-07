import { clamp, lerp } from "../utils"
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

interface coords {
    x: number
    y: number
}

let startCell: coords
let endCell: coords
let checkpoint: coords

let lastMousePos: coords

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

    for (let x = 0; x < gridWidth; x++)
        for (let y = 0; y < gridHeight; y++) updateBlock(x, y)
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
    resetLastMousePos()

    grid[startCell.x][startCell.y].setType("start")
    grid[endCell.x][endCell.y].setType("end")

    drawGrid()
}

const updateBlock = (x: number, y: number) => {
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
        return { index_x, index_y }
    }

    return false
}

const startCollision = (coords: { index_x: number; index_y: number }) =>
    coords.index_x === startCell.x && coords.index_y === startCell.y

const endCollision = (coords: { index_x: number; index_y: number }) =>
    coords.index_x === endCell.x && coords.index_y === endCell.y

const checkpointCollision = (coords: { index_x: number; index_y: number }) =>
    coords.index_x === checkpoint.x && coords.index_y === checkpoint.y

export const placeBlock = (
    event: React.MouseEvent<HTMLCanvasElement>,
    selectedBlock: string
) => {
    let clickCoords = getCoords(event)

    if (
        !clickCoords ||
        startCollision(clickCoords) ||
        endCollision(clickCoords)
    )
        return
    if (checkpointCollision(clickCoords)) checkpoint = { x: -1, y: -1 }

    switch (selectedBlock) {
        case "start":
            grid[startCell.x][startCell.y].setType("empty")
            updateBlock(startCell.x, startCell.y)
            startCell = {
                x: clickCoords.index_x,
                y: clickCoords.index_y
            }
            grid[startCell.x][startCell.y].setType("start")
            updateBlock(startCell.x, startCell.y)
            break

        case "end":
            grid[endCell.x][endCell.y].setType("empty")
            updateBlock(endCell.x, endCell.y)
            endCell = {
                x: clickCoords.index_x,
                y: clickCoords.index_y
            }
            grid[endCell.x][endCell.y].setType("end")
            updateBlock(endCell.x, endCell.y)
            break

        case "checkpoint":
            if (checkpoint.x !== -1) {
                grid[checkpoint.x][checkpoint.y].setType("empty")
                updateBlock(checkpoint.x, checkpoint.y)
            }
            checkpoint = {
                x: clickCoords.index_x,
                y: clickCoords.index_y
            }
            grid[checkpoint.x][checkpoint.y].setType("checkpoint")
            updateBlock(checkpoint.x, checkpoint.y)
            break

        default:
            grid[clickCoords.index_x][clickCoords.index_y].setType(
                selectedBlock
            )
            if (lastMousePos.x !== -1)
                diagonalLine(
                    clickCoords.index_x,
                    clickCoords.index_y,
                    selectedBlock
                )
            else updateBlock(clickCoords.index_x, clickCoords.index_y)
            break
    }
}

// ----- diagonal line -----

export const resetLastMousePos = () => {
    lastMousePos = { x: -1, y: -1 }
}

export const setLastMousePos = (event: React.MouseEvent<HTMLCanvasElement>) => {
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
        lastMousePos = { x: index_x, y: index_y }
        return
    }

    resetLastMousePos()
}

const diagonalLine = (x: number, y: number, selectedBlock: string) => {
    let currentMousePos = { x, y }
    let points = []
    let N = Math.max(
        Math.abs(currentMousePos.x - lastMousePos.x),
        Math.abs(currentMousePos.y - lastMousePos.y)
    )

    for (let step = 0; step < N; step++) {
        let t = N === 0 ? 0.0 : step / N
        points.push({
            x: Math.round(lerp(lastMousePos.x, currentMousePos.x, t)),
            y: Math.round(lerp(lastMousePos.y, currentMousePos.y, t))
        })
    }

    lastMousePos = { ...currentMousePos }

    points.forEach((point) => {
        grid[point.x][point.y].setType(selectedBlock)
        updateBlock(point.x, point.y)
    })
}
