import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {TCellTableValues} from "@src/pages/game/lib";
import {ICellsAction, TGameContext} from "@src/app/providers";
import {cellsDown, cellsLeft, cellsRight, cellsUp, setEmptyTable, spawnCell} from "@src/app/providers/lib";

const emptyCells: TCellTableValues = setEmptyTable()

const GameContext = createContext<TGameContext>({
    cells: [],
    dispatchCells: () => {}
})

const useGameContext = () => useContext(GameContext)

const cellsReducer = (state: TCellTableValues, action: ICellsAction): TCellTableValues => {
    switch (action.type) {
        case 'LEFT':
            return cellsLeft(state)
        case 'RIGHT':
            return cellsRight(state)
        case 'UP':
            return cellsUp(state)
        case 'DOWN':
            return cellsDown(state)
        case 'SPAWN':
            return [...spawnCell(state)]
        default:
            return state
    }
}

const GameProvider = ({children}: { children: ReactNode }) => {
    const [cells, dispatchCells] = useReducer(cellsReducer, emptyCells)

    return (
        <GameContext.Provider value={{cells, dispatchCells}}>
            {children}
        </GameContext.Provider>
    )
}

export {GameProvider, useGameContext}
