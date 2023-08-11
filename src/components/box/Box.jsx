import React, {useState} from 'react'
import styles from './Box.module.css'
import Grid from "../grid/Grid"
import Coordinate from "../coordinate/Coordinate"

const Box = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)

    const handleMouseDown = (e) => {
        e.preventDefault()
        setIsDragging(true)
        setStartX(e.clientX)
        setStartY(e.clientY)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        const newOffsetX = offsetX + e.clientX - startX
        const newOffsetY = offsetY + e.clientY - startY
        setOffsetX(newOffsetX)
        setOffsetY(newOffsetY)
        setStartX(e.clientX)
        setStartY(e.clientY)
    }

    return (
        <div
            className={styles.square}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <Grid/>
            <div className={styles.coordinate}>
                <Coordinate label={'X'} value={offsetX}/>
                <Coordinate label={'Y'} value={offsetY}/>
            </div>
        </div>
    )
}

export default Box