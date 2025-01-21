import {createSlice} from "@reduxjs/toolkit";
import {getEmptyCells} from "@src/entities/game/lib";
import {Cells} from "@src/entities/game/model/types";

interface GameSlice {
    cells: Cells
    gameOver: boolean
    score: number
    bestScore: number
    spawnedIndex: number
    stackedIndexes: number[]
}

const initialState: GameSlice = {
    cells: getEmptyCells(),
    gameOver: false,
    score: 0,
    bestScore: 0,
    spawnedIndex: -1,
    stackedIndexes: []
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    selectors: {
        getCells: (state) => state.cells,
        getGameOver: (state) => state.gameOver,
        getScore: (state) => state.score,
        getSpawnedIndex: (state) => state.spawnedIndex,
        getStackedIndexes: (state) => state.stackedIndexes,
    },
    reducers: {
        setCells: (state, {payload}) => {
            state.cells = payload
        },
        setSpawnedIndex: (state, {payload}) => {
            state.spawnedIndex = payload
        },
        setStackedIndexes: (state, {payload}) => {
            state.stackedIndexes = payload
        }
    }
})

export const {
    getCells,
    getScore,
    getGameOver,
    getSpawnedIndex,
    getStackedIndexes,
} = gameSlice.selectors

export const {
    setCells,
    setSpawnedIndex,
    setStackedIndexes,
} = gameSlice.actions