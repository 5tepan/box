import { createContext, useContext, useState } from 'react'

const CoordinateContext = createContext()

export const useCoordinateContext = () => {
    return useContext(CoordinateContext)
}

export const CoordinateProvider = ({children}) => {
    const [coordinate, setCoordinate] = useState({x: 0, y: 0})

    const updateCoordinate = (x, y) => {
        setCoordinate({x, y})
    }

    return (
        <CoordinateContext.Provider value={{coordinate, updateCoordinate}}>
            {children}
        </CoordinateContext.Provider>
    )
}