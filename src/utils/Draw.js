export const draw = (ctx, cellSize, offset, canvasRef) => {
    const context = ctx
    let step = cellSize
    let left = Math.floor(offset.x / step) * step
    let top = Math.floor(offset.y / step) * step
    let right = left + window.innerWidth
    let bottom = top + window.innerHeight

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    context.beginPath()

    for (let x = left; x < right; x += step) {
        context.moveTo(x - offset.x, 0)
        context.lineTo(x - offset.x, canvasRef.current.height)

        context.fillText((x - offset.x).toString(), x - offset.x, 10)
    }

    for (let y = top; y < bottom; y += step) {
        context.moveTo(0, y - offset.y)
        context.lineTo(canvasRef.current.width, y - offset.y)

        context.fillText((y - offset.y).toString(), 3, y - offset.y)
    }

    context.strokeStyle = "lightgrey"
    context.stroke()
}