import {useAppDispatch, useAppSelector} from "@src/app/stores";
import {animateBottom, animateLeft, animateRight, animateTop, spawnCell} from "@src/entities/game/lib";
import {
	addScore,
	getCells,
	getScore,
	getSpawnedIndex,
	getStackedIndexes,
	setCells,
	setGameOver,
	setSpawnedIndex,
	setStackedIndexes,
} from "@src/entities/game/model";
import {Cell} from "@src/entities/game/ui/cell";
import {requestAnimationTimeout} from "@src/shared/lib/animate";
import {CellsBackground} from "@src/shared/ui/cells-background/CellsBackground";
import {useEffect, useRef} from "react";
import * as s from "./Playground.module.css";

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

const TRANSITION_DURATION = 200;
const TRANSITION_STYLE = `transform ${TRANSITION_DURATION}ms ease`;

export const Playground = () => {
	const cells = useAppSelector((state) => getCells(state));
	const spawnedIndex = useAppSelector((state) => getSpawnedIndex(state));
	const stackedIndexes = useAppSelector((state) => getStackedIndexes(state));
	const containerRef = useRef<HTMLDivElement>(null);
	const currentScore = useAppSelector((state) => getScore(state));
	const dispatch = useAppDispatch();

	const processDirection = (direction: ProcessKey) => {
		if (containerRef.current && processMethod[direction as ProcessKey]) {
			//game over check
			const isGameOver = Object.values(processMethod).every((process) => {
				const result = process(cells);
				return !result.hasMovedCell && !result.hasStackedCell;
			});

			if (isGameOver) {
				const currentBestScore = Number(localStorage.getItem("best_score"));
				if (!currentBestScore || currentBestScore < currentScore) {
					localStorage.setItem("best_score", currentScore.toString());
				}
				dispatch(setGameOver(true));
			}

			const {animated, actual, stackedIndexes, hasStackedCell, hasMovedCell, score} =
				processMethod[direction as ProcessKey](cells);

			if (!hasMovedCell && !hasStackedCell) {
				return;
			}

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
				dispatch(setSpawnedIndex(spawnedResult.spawnIndex));
				dispatch(setStackedIndexes(stackedIndexes));
			}, TRANSITION_DURATION);
		}
	};

	useEffect(() => {
		document.documentElement.style.setProperty("--transition-duration", `${TRANSITION_DURATION}ms`);

		let spawned = spawnCell(cells).cells;
		spawned = spawnCell(spawned).cells;
		dispatch(setCells(spawned));
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			const child = containerRef.current.children as HTMLCollectionOf<HTMLDivElement>;

			Array.from(child).forEach((element) => {
				element.style.transform = "translate(0px, 0px)";
				element.style.transition = "none";
			});
		}

		let startTouch: TouchCoords = {x: 0, y: 0};

		const onTouchStart = (e: TouchEvent) => {
			const {clientX: x, clientY: y} = e.changedTouches[0];
			startTouch = {x, y};
		};

		const onTouchEnd = (e: TouchEvent) => {
			const {clientX: x, clientY: y} = e.changedTouches[0];
			const endTouch: TouchCoords = {x, y};
			const diffX = endTouch.x - startTouch.x;
			const diffY = endTouch.y - startTouch.y;
			let direction: ProcessKey;

			if (Math.abs(diffX) > Math.abs(diffY)) {
				//x axis
				if (diffX === 0) return;
				direction = diffX > 0 ? "ArrowRight" : "ArrowLeft";
			} else {
				//y axis
				if (diffY === 0) return;
				direction = diffY > 0 ? "ArrowDown" : "ArrowUp";
			}
			processDirection(direction);
		};

		const keyboardActions = (e: KeyboardEvent) => {
			processDirection(e.code as ProcessKey);
		};

		document.body.addEventListener("keyup", keyboardActions);
		document.body.addEventListener("touchstart", onTouchStart);
		document.body.addEventListener("touchend", onTouchEnd);

		return () => {
			document.body.removeEventListener("keyup", keyboardActions);
			document.body.removeEventListener("touchstart", onTouchStart);
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
						spawned={index === spawnedIndex}
						stacked={stackedIndexes.includes(index)}
					/>
				))}
			</div>
		</div>
	);
};
