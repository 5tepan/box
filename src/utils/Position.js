export const getPosition = (e, canvasRef) => ({
    x: e.clientX - canvasRef.current.offsetLeft,
    y: e.clientY - canvasRef.current.offsetTop
})