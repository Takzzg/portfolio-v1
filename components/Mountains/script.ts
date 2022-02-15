let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let parent: HTMLElement

export const drawMountains = (peakCount: number, color: string) => {
    console.log("drawing mountains")

    canvas = document.getElementById("mountains") as HTMLCanvasElement
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    parent = canvas.parentElement as HTMLElement

    canvas.width = parent.clientWidth
    canvas.height = parent.clientHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const distance = Math.floor(canvas.width / (peakCount + 1))

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(0, canvas.height)
    ctx.lineTo(0, canvas.height / 2)

    for (let x = 1; x <= peakCount; x++) {
        ctx.lineTo(x * distance, Math.random() * canvas.height)
    }

    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.fill()
}
