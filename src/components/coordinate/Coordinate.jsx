import React from 'react'
import {useCoordinateContext} from "../coordinateContext/CoordinateContext"

const Coordinate = ({label}) => {
    const { xCoordinate, yCoordinate } = useCoordinateContext()
    const value = label === 'X' ? xCoordinate : yCoordinate

    return (
        <p>
            {label}: {value}
        </p>
    )
}

export default Coordinate