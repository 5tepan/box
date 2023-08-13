import { createContext, useContext, useState } from 'react'

const CoordinateContext = createContext()

export const useCoordinateContext = () => {
    return useContext(CoordinateContext)
}

export const CoordinateProvider = ({ children }) => {
    const [xCoordinate, setXCoordinate] = useState(0)
    const [yCoordinate, setYCoordinate] = useState(0)

    const updateXCoordinate = (x) => {
        setXCoordinate(x)
    }

    const updateYCoordinate = (y) => {
        setYCoordinate(y)
    }

    return (
        <CoordinateContext.Provider value={{xCoordinate, yCoordinate, updateXCoordinate, updateYCoordinate}}>
            {children}
        </CoordinateContext.Provider>
    )
}