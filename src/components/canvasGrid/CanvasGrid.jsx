import React, { useRef, useEffect, useState } from 'react'
import {useCoordinateContext} from "../coordinateContext/CoordinateContext"

import styles from './CanvasGrid.module.css'

const CanvasGrid = () => {
    const canvasRef = useRef(null)
    const [ctx, setCtx] = useState(null)
    const [start, setStart] = useState(null)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

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
    }, [ctx, offset])

    const draw = () => {
        const context = ctx
        let step = 10
        let left = Math.floor(offset.x / step) * step
        let top = Math.floor(offset.y / step) * step
        let right = left + window.innerWidth
        let bottom = top + window.innerHeight

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        context.beginPath()

        for (let x = left; x < right; x += step) {
            context.moveTo(x - offset.x, 0)
            context.lineTo(x - offset.x, canvasRef.current.height)
        }

        for (let y = top; y < bottom; y += step) {
            context.moveTo(0, y - offset.y)
            context.lineTo(canvasRef.current.width, y - offset.y)
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

            const offsetX = position.x - start.x
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

    return (
        <div className={styles.container}>
            <canvas
                ref={canvasRef}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseMove={mouseMove}
                onMouseLeave={mouseLeave}
                width={10000}
                height={10000}
            />
        </div>
    )
}

export default CanvasGrid
