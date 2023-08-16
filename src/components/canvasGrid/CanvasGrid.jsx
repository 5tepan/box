import React, { useRef, useEffect, useState } from 'react'
import {useCoordinateContext} from "../coordinateContext/CoordinateContext"
import {getPosition} from "../../utils/Position"
import {draw} from "../../utils/Draw"

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
            draw(ctx, cellSize, offset, canvasRef)
        }
    }, [ctx, offset, cellSize])

    const mouseDown = (e) => {
        const position = getPosition(e, canvasRef)
        setStart(position)
    }

    const mouseUp = () => {
        setStart(null)
    }

    const mouseLeave = () => {
        setStart(null)
    }

    const mouseMove = (e) => {
        if (start) {
            const position = getPosition(e, canvasRef)

            const offsetX = (position.x - start.x)
            const offsetY = position.y - start.y

            updateXCoordinate(position.x - offset.x)
            updateYCoordinate(position.y - offset.y)

            setOffset(prevOffset => ({
                x: prevOffset.x + offsetX,
                y: prevOffset.y + offsetY
            }))

            draw(ctx, cellSize, offset, canvasRef)
        }
    }

    const zoom = (e) => {
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
            onWheel={zoom}
            width={10000}
            height={10000}
        />
    )
}

export default CanvasGrid
