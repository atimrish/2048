import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootStore} from "@src/app/stores";
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

export const localStorageSaveThunk = createAsyncThunk("game/localStorageSave", async (_, {getState}) => {
	const {game} = getState() as RootStore;
	localStorage.setItem(LOCAL_STORAGE_KEYS.CELLS, JSON.stringify(game.cells));
	localStorage.setItem(LOCAL_STORAGE_KEYS.SCORE, game.score.toString());
	localStorage.setItem(LOCAL_STORAGE_KEYS.BEST_SCORE, game.bestScore.toString());
});

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
		setBestScore: (state, {payload}) => {
			state.bestScore = payload;
		},
		addScore: (state, {payload}) => {
			state.score += payload;
		},
		setGameOver: (state, {payload}) => {
			state.gameOver = payload;
		},
		resetGame: (state) => {
			const startCells = getStartCells();
			state.cells = startCells.cells;
			state.spawnedIndexes = startCells.spawnedIndexes;

			state.gameOver = false;
			state.score = 0;
			state.stackedIndexes = [];
		},
	},
});

export const {getCells, getScore, getGameOver, getSpawnedIndexes, getStackedIndexes, getBestScore} =
	gameSlice.selectors;

export const {
	setCells,
	setSpawnedIndexes,
	setStackedIndexes,
	setScore,
	addScore,
	setGameOver,
	resetGame,
	setBestScore,
} = gameSlice.actions;
