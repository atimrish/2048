import {createSlice} from "@reduxjs/toolkit";
import {getStartCells} from "@src/entities/game/lib";
import {LOCAL_STORAGE_KEYS} from "@src/features/game/config";
import {Cells} from "@src/features/game/model/types";

interface GameSlice {
	cells: Cells;
	gameOver: boolean;
	score: number;
	bestScore: number;
	spawnedIndexes: Record<number, boolean>;
	stackedIndexes: number[];
}

const initialCells = localStorage.getItem(LOCAL_STORAGE_KEYS.CELLS);
const initialScore = localStorage.getItem(LOCAL_STORAGE_KEYS.SCORE);
const initialBestScore = localStorage.getItem(LOCAL_STORAGE_KEYS.BEST_SCORE);

const initialState: GameSlice = {
	cells: initialCells ? JSON.parse(initialCells) : getStartCells().cells,
	gameOver: false,
	score: initialScore ? +initialScore : 0,
	bestScore: Number(initialBestScore) || 0,
	spawnedIndexes: {},
	stackedIndexes: [],
};

const getInitialState = (): GameSlice => {
	const startData = getStartCells();

	return {
		cells: initialCells ? JSON.parse(initialCells) : startData.cells,
		gameOver: false,
		score: initialScore ? +initialScore : 0,
		bestScore: Number(initialBestScore) || 0,
		spawnedIndexes: startData.spawnedIndexes,
		stackedIndexes: [],
	};
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	selectors: {
		getCells: (state) => state.cells,
		getGameOver: (state) => state.gameOver,
		getScore: (state) => state.score,
		getSpawnedIndexes: (state) => state.spawnedIndexes,
		getStackedIndexes: (state) => state.stackedIndexes,
		getBestScore: (state) => state.bestScore,
	},
	reducers: {
		setCells: (state, {payload}) => {
			state.cells = payload;
		},
		setSpawnedIndexes: (state, {payload}) => {
			state.spawnedIndexes = payload;
		},
		setStackedIndexes: (state, {payload}) => {
			state.stackedIndexes = payload;
		},
		setScore: (state, {payload}) => {
			state.score = payload;
		},
		addScore: (state, {payload}) => {
			state.score += payload;
		},
		setGameOver: (state, {payload}) => {
			state.gameOver = payload;
		},
		resetGame: (state) => {
			const currentBestScore = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.BEST_SCORE));

			if (state.score > currentBestScore) {
				//сохраняем в bestScore в localStorage
				localStorage.setItem(LOCAL_STORAGE_KEYS.BEST_SCORE, state.score.toString());
			}

			const startCells = getStartCells();
			state.cells = startCells.cells;
			state.spawnedIndexes = startCells.spawnedIndexes;

			state.gameOver = false;
			state.score = 0;
			state.bestScore = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.BEST_SCORE)) || 0;
			state.stackedIndexes = [];

			localStorage.removeItem(LOCAL_STORAGE_KEYS.CELLS);
			localStorage.setItem(LOCAL_STORAGE_KEYS.SCORE, state.score.toString());
		},
	},
});

export const {getCells, getScore, getGameOver, getSpawnedIndexes, getStackedIndexes, getBestScore} =
	gameSlice.selectors;

export const {setCells, setSpawnedIndexes, setStackedIndexes, setScore, addScore, setGameOver, resetGame} =
	gameSlice.actions;
