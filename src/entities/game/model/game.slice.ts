import {createSlice} from "@reduxjs/toolkit";
import {getEmptyCells, spawnCell} from "@src/entities/game/lib";
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
    bestScore: Number(localStorage.getItem('best_score')) || 0,
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
        getBestScore: (state) => state.bestScore,
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
        },
        setScore: (state, {payload}) => {
            state.score = payload
        },
        addScore: (state, {payload}) => {
            state.score += payload
        },
        setGameOver: (state, {payload}) => {
            state.gameOver = payload
        },
        resetGame: (state) => {
            let stacked = spawnCell(getEmptyCells()).cells
            state.cells = spawnCell(stacked).cells
            state.gameOver = false
            state.score = 0
            state.bestScore = Number(localStorage.getItem('best_score')) || 0
            state.spawnedIndex = -1
            state.stackedIndexes = []
        }
    }
})

export const {
    getCells,
    getScore,
    getGameOver,
    getSpawnedIndex,
    getStackedIndexes,
    getBestScore,
} = gameSlice.selectors

export const {
    setCells,
    setSpawnedIndex,
    setStackedIndexes,
    setScore,
    addScore,
    setGameOver,
    resetGame
} = gameSlice.actions