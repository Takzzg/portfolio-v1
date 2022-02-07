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
        for (let y = 0; y < gridHeight; y++)
            grid[x][y] = new Cell(x, y, "empty")
    }

    startCell = { x: 4, y: Math.ceil(gridHeight / 2) }
    endCell = { x: gridWidth - 5, y: Math.ceil(gridHeight / 2) }
    checkpoint = { x: -1, y: -1 }

    resetLastMousePos()

    grid[startCell.x][startCell.y].type = "start"
    grid[endCell.x][endCell.y].type = "end"

    drawGrid()
}

const updateBlock = (x: number, y: number) => {
    let posX = x * cellSize + offsetX + gutter
    let posY = y * cellSize + offsetY + gutter
    let w = cellSize - gutter * 2
    let h = cellSize - gutter * 2

    ctx.fillStyle = grid[x][y].color
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
            grid[startCell.x][startCell.y].type = "empty"
            updateBlock(startCell.x, startCell.y)
            startCell = {
                x: clickCoords.index_x,
                y: clickCoords.index_y
            }
            grid[startCell.x][startCell.y].type = "start"
            updateBlock(startCell.x, startCell.y)
            break

        case "end":
            grid[endCell.x][endCell.y].type = "empty"
            updateBlock(endCell.x, endCell.y)
            endCell = {
                x: clickCoords.index_x,
                y: clickCoords.index_y
            }
            grid[endCell.x][endCell.y].type = "end"
            updateBlock(endCell.x, endCell.y)
            break

        case "checkpoint":
            if (checkpoint.x !== -1) {
                grid[checkpoint.x][checkpoint.y].type = "empty"
                updateBlock(checkpoint.x, checkpoint.y)
            }
            checkpoint = {
                x: clickCoords.index_x,
                y: clickCoords.index_y
            }
            grid[checkpoint.x][checkpoint.y].type = "checkpoint"
            updateBlock(checkpoint.x, checkpoint.y)
            break

        default:
            grid[clickCoords.index_x][clickCoords.index_y].type = selectedBlock
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
        grid[point.x][point.y].type = selectedBlock
        updateBlock(point.x, point.y)
    })
}

// ----- maze generation -----

export const generateMaze = () => {
    let _grid: Cell[][]
    _grid = []

    for (let x = 0; x < gridWidth; x++) {
        _grid[x] = []
        for (let y = 0; y < gridHeight; y++)
            _grid[x][y] = new Cell(x, y, "wall")
    }

    startCell = { x: 0, y: 0 }
    endCell = { x: gridWidth - 1, y: gridHeight - 1 }

    _grid[0][0].type = "start"
    _grid[gridWidth - 1][gridHeight - 1].type = "end"

    grid = [...recursiveBacktracking(_grid, 0, 0)]

    for (let x = 0; x < gridWidth; x++)
        for (let y = 0; y < gridHeight; y++) grid[x][y].visited = false

    drawGrid()
}

const recursiveBacktracking = (
    _grid: Cell[][],
    x: number,
    y: number,
    neighbours: Cell[] = []
) => {
    if (_grid[x][y].type !== "start" && _grid[x][y].type !== "end")
        _grid[x][y].type = "empty"
    _grid[x][y].visited = true

    neighbours.push(...getNeighbours(_grid, x, y))

    let randN: Cell
    let randI = -1

    while (neighbours.length) {
        randI = Math.floor(Math.random() * neighbours.length)
        randN = neighbours[randI]
        let visitedN = 0

        getNeighbours(_grid, randN.x, randN.y).forEach((neigh) => {
            if (neigh.visited) visitedN++
        })
        neighbours.splice(randI, 1)
        if (visitedN < 2)
            recursiveBacktracking(_grid, randN.x, randN.y, neighbours)
    }

    return _grid
}

const getNeighbours = (_grid: Cell[][], x: number, y: number) => {
    let neighbours: Cell[] = []

    if (x - 1 >= 0) neighbours.push(_grid[x - 1][y])
    if (x + 1 <= gridWidth - 1) neighbours.push(_grid[x + 1][y])
    if (y - 1 >= 0) neighbours.push(_grid[x][y - 1])
    if (y + 1 <= gridHeight - 1) neighbours.push(_grid[x][y + 1])

    return neighbours
}
