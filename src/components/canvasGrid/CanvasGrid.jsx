import React, { useRef, useEffect, useState } from 'react'
import {useCoordinateContext} from "../coordinateContext/CoordinateContext"

const CanvasGrid = () => {
    const canvasRef = useRef(null)
    const [ctx, setCtx] = useState(null)
    const [start, setStart] = useState(null)
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const [cellSize, setCellSize] = useState(20)

    const { updateXCoordinate, updateYCoordinate } = useCoordinateContext()

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        setCtx(context)
    }, [])

    useEffect(() => {
        if (ctx) {
            draw()
        }
    }, [ctx, offset, cellSize])

    const draw = () => {
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

    const getPosition = (e) => ({
        x: e.clientX - canvasRef.current.offsetLeft,
        y: e.clientY - canvasRef.current.offsetTop
    })

    const mouseDown = (e) => {
        setStart(getPosition(e))
    }

    const mouseUp = () => {
        setStart(null)
    }

    const mouseLeave = () => {
        if (start) {
            setStart(null)
        }
    }

    const mouseMove = (e) => {
        if (start) {
            const position = getPosition(e)

            const offsetX = (position.x - start.x)
            const offsetY = position.y - start.y

            updateXCoordinate(position.x - offset.x)
            updateYCoordinate(position.y - offset.y)

            setOffset(prevOffset => ({
                x: prevOffset.x + offsetX,
                y: prevOffset.y + offsetY
            }))

            draw()
        }
    }

    const wheel = (e) => {
        const newCellSize = cellSize + (e.deltaY > 0 ? -1 : 1)

        if (newCellSize >= 1 && newCellSize <= 100) {
            setCellSize(newCellSize)
        }
    }

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
            onWheel={wheel}
            width={10000}
            height={10000}
        />
    )
}

export default CanvasGrid
