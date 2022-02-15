export const drawMountains = (
    _canvas: HTMLCanvasElement,
    peakCount: number
) => {
    let canvas = _canvas
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    let parent = canvas.parentElement as HTMLElement

    canvas.width = parent.clientWidth

    parent.parentElement!.style.position = "relative"

    const prevParent = parent.parentElement!
        .previousElementSibling as HTMLElement
    prevParent.style.paddingBottom = canvas.height.toString() + "px"

    const distance = Math.floor(canvas.width / (peakCount + 1))

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = parent.parentElement?.style.backgroundColor as string
    ctx.beginPath()
    ctx.moveTo(0, canvas.height)
    ctx.lineTo(0, canvas.height / 2)

    for (let x = 1; x <= peakCount; x++)
        ctx.lineTo(x * distance, Math.random() * canvas.height)

    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.fill()
}
