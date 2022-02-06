export class Cell {
    x: string
    y: string
    type: string
    state: string
    color = "white"

    constructor(x: string, y: string, type: string, state: string) {
        this.x = x
        this.y = y
        this.type = type
        this.state = state

        this.setColor(this.type)
    }

    setColor(type: string) {
        switch (type) {
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
                this.color = "white"
        }
    }

    getColor() {
        return this.color
    }
}
