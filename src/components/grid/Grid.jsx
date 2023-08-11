import React from 'react'
import styles from './Grid.module.css'

const Grid = () => {
    const gridSize = 20
    const rows = []
    const cols = []

    for (let i = 0; i < 500 / gridSize; i++) {
        rows.push(
            <div
                key={`row-${i}`}
                className={styles.gridRow}
                style={{ top: i * gridSize }}
            />
        )
        cols.push(
            <div
                key={`col-${i}`}
                className={styles.gridCol}
                style={{ left: i * gridSize }}
            />
        )
    }

    return (
        <>
            {rows}
            {cols}
        </>
    )
}

export default Grid