import React from 'react'
import {useCoordinateContext} from "../coordinateContext/CoordinateContext"

const Coordinate = ({label}) => {
    const {coordinate} = useCoordinateContext()
    const value = label === 'X' ? coordinate.x : coordinate.y

    return (
        <p>
            {label}: {value}
        </p>
    )
}

export default Coordinate