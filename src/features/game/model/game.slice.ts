import {createSlice} from "@reduxjs/toolkit";
import {getStartCells} from "@src/entities/game/lib";
import {spawnCell} from "@src/features/game/lib";
import {Cells} from "@src/features/game/model/types";
import {LOCAL_STORAGE_KEYS} from '@src/features/game/config'

interface GameSlice {
    cells: Cells
    gameOver: boolean
    score: number
    bestScore: number
    spawnedIndex: number
    stackedIndexes: number[]
}

const initialCells = localStorage.getItem(LOCAL_STORAGE_KEYS.CELLS)
const initialScore = localStorage.getItem(LOCAL_STORAGE_KEYS.SCORE)
const initialBestScore = localStorage.getItem(LOCAL_STORAGE_KEYS.BEST_SCORE)

const initialState: GameSlice = {
    cells: initialCells ? JSON.parse(initialCells) : getStartCells(),
    gameOver: false,
    score: initialScore ? +initialScore : 0,
    bestScore: Number(initialBestScore) || 0,
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
            state.cells = getStartCells()
            state.gameOver = false
            state.score = 0
            state.bestScore = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.BEST_SCORE)) || 0
            state.spawnedIndex = -1
            state.stackedIndexes = []

            localStorage.setItem(LOCAL_STORAGE_KEYS.CELLS, JSON.stringify(state.cells))
            localStorage.setItem(LOCAL_STORAGE_KEYS.SCORE, state.score.toString())
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