import React from 'react'
import Box from "./components/box/Box"
import Coordinate from "./components/coordinate/Coordinate"
import {CoordinateProvider} from "./components/coordinateContext/CoordinateContext"

import styles from './App.module.css'

const App = () => {

    return (
        <CoordinateProvider>
            <div className={styles.app}>
                <div className={styles.coordinateY}>
                    <Coordinate label={'Y'}/>
                </div>
                <div className={styles.block}>
                    <Box/>
                    <div>
                        <Coordinate label={'X'}/>
                    </div>
                </div>
            </div>
        </CoordinateProvider>
    )
}

export default App