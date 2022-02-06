class Cell {
    private x: number
    private y: number
    private type: string
    private visited: boolean
    private color = "white"

    constructor(x: number, y: number, type: string) {
        this.x = x
        this.y = y
        this.type = type
        this.visited = false

        this.setColor()
    }

    private setColor() {
        switch (this.type) {
            case "start":
                this.color = "green"
                break
            case "checkpoint":
                this.color = "blue"
                break
            case "end":
                this.color = "red"
                break
            case "wall":
                this.color = "black"
                break
            default:
                this.visited ? (this.color = "grey") : (this.color = "white")
        }
    }

    getColor() {
        return this.color
    }

    setType(type: string) {
        this.type = type
        this.setColor()
    }

    setVisited(state: boolean) {
        this.visited = state
        this.setColor()
    }
}

export default Cell
