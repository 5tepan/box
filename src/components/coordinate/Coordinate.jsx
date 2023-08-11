import React from 'react'
import styles from './Coordinate.module.css'

const Coordinate = ({label, value}) => {
    return (
        <p>
            {label}: {value}
        </p>
    )
}

export default Coordinate