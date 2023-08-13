import React from 'react'
import styles from './Grid.module.css'

const Grid = ({scale, offsetX, offsetY}) => {
    const cellSize = 20 * scale
    const numCells = Math.ceil(500 / (cellSize * scale))
    const gridCells = []

    for (let i = 0; i < numCells; i++) {
        for (let j = 0; j < numCells; j++) {
            gridCells.push(
                <div
                    key={`cell-${i}-${j}`}
                    className={styles.gridCell}
                    style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        transform: `translate(${j * cellSize}px, ${i * cellSize}px) translate(${offsetX}px, ${offsetY}px) scale(${scale})`
                    }}
                />
            )
        }
    }

    return (
        <div>
            {gridCells}
        </div>
    )
}

export default Grid