import {useAppDispatch, useAppSelector} from "@src/app/stores";
import {Cell} from "@src/entities/game/ui/cell";
import {animateBottom, animateLeft, animateRight, animateTop, spawnCell} from "@src/features/game/lib";
import {
	addScore,
	getCells,
	getGameOver,
	getScore,
	getSpawnedIndexes,
	getStackedIndexes,
	resetGame,
	setCells,
	setGameOver,
	setSpawnedIndexes,
	setStackedIndexes,
} from "@src/features/game/model";
import {requestAnimationTimeout} from "@src/shared/lib/animate";
import {CellsBackground} from "@src/shared/ui/cells-background/CellsBackground";
import {useEffect, useRef} from "react";
import {LOCAL_STORAGE_KEYS, MIN_DIFF} from "@src/features/game/config";
import * as s from "./Playground.module.css";
import {checkCanMove} from "@src/features/game/lib/check-can-move/checkCanMove";

const processMethod = {
	ArrowUp: animateTop,
	ArrowDown: animateBottom,
	ArrowLeft: animateLeft,
	ArrowRight: animateRight,
	KeyW: animateTop,
	KeyS: animateBottom,
	KeyA: animateLeft,
	KeyD: animateRight,
};

type ProcessKey = keyof typeof processMethod;
type TouchCoords = {x: number; y: number};

const TRANSITION_DURATION = 150;

const TRANSITION_STYLE = `transform ${TRANSITION_DURATION}ms ease`;

export const Playground = () => {
	const gameOver = useAppSelector((state) => getGameOver(state));
	const cells = useAppSelector((state) => getCells(state));
	const spawnedIndexes = useAppSelector((state) => getSpawnedIndexes(state));
	const stackedIndexes = useAppSelector((state) => getStackedIndexes(state));
	const containerRef = useRef<HTMLDivElement>(null);
	const currentScore = useAppSelector((state) => getScore(state));
	const dispatch = useAppDispatch();
	let isMoving = false;

	const processDirection = (direction: ProcessKey) => {
		if (containerRef.current && processMethod[direction]) {
			//prevent actions while moving
			if (isMoving) {
				return;
			}

			//game over check
			if (!checkCanMove(cells)) {
				dispatch(setGameOver(true));
			}

			const {animated, actual, stackedIndexes, hasStackedCell, hasMovedCell, score} =
				processMethod[direction](cells);

			if (!hasMovedCell && !hasStackedCell) {
				return;
			}

			//set in moving
			isMoving = true;

			const flatAnimated = animated.flat();
			const child = containerRef.current.children as HTMLCollectionOf<HTMLDivElement>;
			const spawnedResult = spawnCell(actual);

			for (let i = 0; i < child.length; i++) {
				child[i].style.transform = flatAnimated[i];
				child[i].style.transition = TRANSITION_STYLE;
			}

			requestAnimationTimeout(() => {
				dispatch(addScore(score));
				dispatch(setCells(spawnedResult.cells));
				dispatch(setSpawnedIndexes({[spawnedResult.spawnIndex]: true}));
				dispatch(setStackedIndexes(stackedIndexes));

				//unset in moving
				isMoving = false;
			}, TRANSITION_DURATION);
		}
	};

	useEffect(() => {
		document.documentElement.style.setProperty("--transition-duration", `${TRANSITION_DURATION}ms`);
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			const child = containerRef.current.children as HTMLCollectionOf<HTMLDivElement>;

			Array.from(child).forEach((element) => {
				element.style.transform = "translate(0px, 0px)";
				element.style.transition = "none";
			});
		}

		//сохраняем в localStorage, чтобы после перезагрузки результат сохранился
		localStorage.setItem(LOCAL_STORAGE_KEYS.CELLS, JSON.stringify(cells));
		localStorage.setItem(LOCAL_STORAGE_KEYS.SCORE, currentScore.toString());

		let startTouch: TouchCoords = {x: 0, y: 0};
		let endTouch: TouchCoords = {x: 0, y: 0};

		const onTouchStart = (e: TouchEvent) => {
			const {clientX: x, clientY: y} = e.changedTouches[0];
			startTouch = {x, y};
		};

		const onTouchMove = (e: TouchEvent) => {
			e.preventDefault();
			endTouch.x = e.changedTouches[0].clientX;
			endTouch.y = e.changedTouches[0].clientY;
		};

		const onTouchEnd = () => {
			const diffX = endTouch.x - startTouch.x;
			const diffY = endTouch.y - startTouch.y;
			const absDiffX = Math.abs(diffX);
			const absDiffY = Math.abs(diffY);

			let direction: ProcessKey;

			if (absDiffX > absDiffY) {
				//x axis
				if (absDiffX < MIN_DIFF) return;
				direction = diffX > 0 ? "ArrowRight" : "ArrowLeft";
			} else {
				//y axis
				if (absDiffY < MIN_DIFF) return;
				direction = diffY > 0 ? "ArrowDown" : "ArrowUp";
			}

			processDirection(direction);

			//обнуляем конечные координаты
			endTouch.x = 0;
			endTouch.y = 0;
		};

		const keyboardActions = (e: KeyboardEvent) => {
			processDirection(e.code as ProcessKey);
		};

		document.body.addEventListener("keyup", keyboardActions);
		document.body.addEventListener("touchstart", onTouchStart);
		document.body.addEventListener("touchmove", onTouchMove);
		document.body.addEventListener("touchend", onTouchEnd);

		return () => {
			document.body.removeEventListener("keyup", keyboardActions);
			document.body.removeEventListener("touchstart", onTouchStart);
			document.body.removeEventListener("touchmove", onTouchMove);
			document.body.removeEventListener("touchend", onTouchEnd);

			const child = containerRef.current?.children as HTMLCollectionOf<HTMLDivElement>;

			Array.from(child).forEach((element) => {
				element.style.transform = "translate(0px, 0px)";
				element.style.transition = TRANSITION_STYLE;
			});
		};
	}, [cells]);

	return (
		<div className={s.container}>
			<div className={s.absolute}>
				<CellsBackground />
			</div>

			<div className={s.playground} ref={containerRef}>
				{cells.flat().map((i, index) => (
					<Cell
						key={index}
						value={i}
						spawned={Boolean(spawnedIndexes[index])}
						stacked={stackedIndexes.includes(index)}
					/>
				))}
			</div>

			{gameOver && (
				<div className={s.game_over} onClick={() => dispatch(resetGame())}>
					New game
				</div>
			)}
		</div>
	);
};
