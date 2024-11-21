import React, {createContext, ReactNode, useContext, useEffect, useReducer, useState} from "react";
import {TCellTableValues, TTableStacked} from "@src/pages/game/lib";
import {ICellsAction, TGameContext} from "@src/app/providers";
import {
    cellsDown,
    cellsLeft,
    cellsRight,
    cellsUp,
    canMove,
    setEmptyTable,
    spawnCell
} from "@src/app/providers/lib";
import {LocalStorageKeys} from "@src/shared/config";

const emptyCells: TTableStacked = [setEmptyTable(), 0, 0]

const GameContext = createContext<TGameContext>({
    value: emptyCells,
    dispatchCells: () => {
    },
    gameOver: false,
    spawnedIndex: -1,
})

const useGameContext = () => useContext(GameContext)

const cellsActions: Record<string, (cells: TCellTableValues) => TTableStacked> = {
    LEFT: cellsLeft,
    RIGHT: cellsRight,
    UP: cellsUp,
    DOWN: cellsDown,
}

const GameProvider = ({children}: { children: ReactNode }) => {
    const [gameOver, setGameOver] = useState(false)
    const [spawnedIndex, setSpawnedIndex] = useState(-1)

    const cellsReducer = (state: TTableStacked, action: ICellsAction): TTableStacked => {
        if (Object.keys(cellsActions).includes(action.type)) {
            const stacked = cellsActions[action.type](state[0])
            return [stacked[0], state[1] + stacked[1], state[2] + stacked[2]]
        } else if (action.type === 'SPAWN') {
            const spawned = spawnCell(state[0])
            setSpawnedIndex(spawned.spawnedIndex)
            return [spawned.cells, state[1], state[2]]
        } else if (action.type === 'NEW_GAME') {
            setGameOver(false)
            let emptyTable = setEmptyTable()
            const first = spawnCell(emptyTable)
            const second = spawnCell(first.cells)
            return [second.cells, 0, 0]
        }

        return state
    }

    const [value, dispatchCells] = useReducer(cellsReducer, emptyCells)

    useEffect(() => {
        const cannotStack = Object.entries(cellsActions).every(([, stackMethod]) => {
            const stackResult = stackMethod(value[0])
            return stackResult[1] === 0
        })

        if (cannotStack && !canMove(value[0])) {
            setGameOver(true)
        }
    }, [value]);

    useEffect(() => {
        if (gameOver) {
            const currentTopValueString = localStorage.getItem(LocalStorageKeys.TOP_VALUE)
            const currentTopValue = currentTopValueString ? +currentTopValueString : 0

            if (currentTopValue < value[2]) {
                localStorage.setItem(LocalStorageKeys.TOP_VALUE, value[2].toString())
            }
        }
    }, [gameOver]);

    return (
        <GameContext.Provider value={{value, dispatchCells, gameOver, spawnedIndex}}>
            {children}
        </GameContext.Provider>
    )
}

export {GameProvider, useGameContext}
