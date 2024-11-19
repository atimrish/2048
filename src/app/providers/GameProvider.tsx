import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {TTableStacked} from "@src/pages/game/lib";
import {ICellsAction, TGameContext} from "@src/app/providers";
import {cellsDown, cellsLeft, cellsRight, cellsUp, setEmptyTable, spawnCell} from "@src/app/providers/lib";

const emptyCells: TTableStacked = [setEmptyTable(), 0, 0]

const GameContext = createContext<TGameContext>({
    value: emptyCells,
    dispatchCells: () => {}
})

const useGameContext = () => useContext(GameContext)

const cellsReducer = (state: TTableStacked, action: ICellsAction): TTableStacked => {
    let stacked
    switch (action.type) {
        case 'LEFT':
            stacked = cellsLeft(state[0])
            return [stacked[0], state[1] + stacked[1], state[2] + stacked[2]]
        case 'RIGHT':
            stacked = cellsRight(state[0])
            return [stacked[0], state[1] + stacked[1], state[2] + stacked[2]]
        case 'UP':
            stacked = cellsUp(state[0])
            return [stacked[0], state[1] + stacked[1], state[2] + stacked[2]]
        case 'DOWN':
            stacked = cellsDown(state[0])
            return [stacked[0], state[1] + stacked[1], state[2] + stacked[2]]
        case 'SPAWN':
            return [spawnCell(state[0]), state[1], state[2]]
        default:
            return state
    }
}

const GameProvider = ({children}: { children: ReactNode }) => {
    const [value, dispatchCells] = useReducer(cellsReducer, emptyCells)

    return (
        <GameContext.Provider value={{value, dispatchCells}}>
            {children}
        </GameContext.Provider>
    )
}

export {GameProvider, useGameContext}
