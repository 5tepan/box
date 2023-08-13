import React from 'react'
import CanvasGrid from "../canvasGrid/CanvasGrid"

import styles from './Box.module.css'

const Box = () => {

    return (
        <div className={styles.square}>
            <CanvasGrid/>
        </div>
    )
}

export default Box