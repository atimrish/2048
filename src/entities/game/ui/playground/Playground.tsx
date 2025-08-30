import {useAppDispatch, useAppSelector} from "@src/app/stores";
import {Cell} from "@src/entities/game/ui/cell";
import {MIN_DIFF} from "@src/features/game/config";
import {animateBottom, animateLeft, animateRight, animateTop, spawnCell} from "@src/features/game/lib";
import {checkCanMove} from "@src/features/game/lib/check-can-move/checkCanMove";
import {
	addLastStep,
	addScore,
	getAnimationSpeed,
	getBestScore,
	getCells,
	getGameOver,
	getScore,
	getSpawnedIndexes,
	getStackedIndexes,
	localStorageSaveThunk,
	resetGame,
	rollbackStep,
	setBestScore,
	setCells,
	setGameOver,
	setSpawnedIndexes,
	setStackedIndexes,
} from "@src/features/game/model";
import {debounce} from "@src/shared/lib";
import {requestAnimationTimeout} from "@src/shared/lib/animate";
import {CellsBackground} from "@src/shared/ui/cells-background/CellsBackground";
import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
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

export const Playground = () => {
	const {t} = useTranslation();

	const gameOver = useAppSelector((state) => getGameOver(state));
	const cells = useAppSelector((state) => getCells(state));
	const spawnedIndexes = useAppSelector((state) => getSpawnedIndexes(state));
	const stackedIndexes = useAppSelector((state) => getStackedIndexes(state));
	const containerRef = useRef<HTMLDivElement>(null);
	const eventContainerRef = useRef<HTMLDivElement>(null);

	const currentScore = useAppSelector((state) => getScore(state));
	const currentBestScore = useAppSelector((state) => getBestScore(state));
	const animationSpeed = useAppSelector((state) => getAnimationSpeed(state));
	const dispatch = useAppDispatch();
	let isMoving = false;

	const TRANSITION_STYLE = `transform ${animationSpeed}ms cubic-bezier(0.975, 0.975, 0.255, 1.015)`;

	const [cellWidth, setCellWidth] = useState(0);

	const processDirection = (direction: ProcessKey, cellWidth: number) => {
		if (containerRef.current && processMethod[direction]) {
			//prevent actions while moving
			if (isMoving) {
				return;
			}

			//game over check
			if (!checkCanMove(cells)) {
				dispatch(setGameOver(true));
			}

			const {animated, actual, stackedIndexes, hasStackedCell, hasMovedCell, score} = processMethod[direction](
				cells,
				cellWidth
			);

			if (!hasMovedCell && !hasStackedCell) {
				return;
			}

			//set in moving
			isMoving = true;

			const flatAnimated = animated.flat();
			const child = containerRef.current.children as HTMLCollectionOf<HTMLDivElement>;
			const spawnedResult = spawnCell(actual);

			//set animations
			for (let i = 0; i < child.length; i++) {
				child[i].style.transform = flatAnimated[i];
				child[i].style.transition = TRANSITION_STYLE;
			}

			requestAnimationTimeout(() => {
				dispatch(addScore(score));
				dispatch(setCells(spawnedResult.cells));
				dispatch(setSpawnedIndexes({[spawnedResult.spawnIndex]: true}));
				dispatch(setStackedIndexes(stackedIndexes));

				dispatch(
					addLastStep({
						score: currentScore,
						cells: cells,
					})
				);

				//unset in moving
				isMoving = false;
			}, animationSpeed);
		}
	};

	useEffect(() => {
		document.documentElement.style.setProperty("--transition-duration", `${animationSpeed}ms`);
	}, [animationSpeed]);

	useEffect(() => {
		if (containerRef.current) {
			const {width} = containerRef.current.children[0].getBoundingClientRect();
			setCellWidth(width);
		}

		const debouncedResize = debounce(() => {
			if (containerRef.current) {
				const {width} = containerRef.current.children[0].getBoundingClientRect();
				setCellWidth(width);
			}
		}, 50);
		window.addEventListener("resize", debouncedResize);

		return () => {
			window.removeEventListener("resize", debouncedResize);
		};
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

			if (startTouch.x === 0 || startTouch.y === 0 || endTouch.x === 0 || endTouch.y === 0) {
				return;
			}

			if (absDiffX > absDiffY) {
				//x axis
				if (absDiffX < MIN_DIFF) return;
				direction = diffX > 0 ? "ArrowRight" : "ArrowLeft";
			} else {
				//y axis
				if (absDiffY < MIN_DIFF) return;
				direction = diffY > 0 ? "ArrowDown" : "ArrowUp";
			}

			processDirection(direction, cellWidth);

			//обнуляем конечные координаты
			endTouch.x = 0;
			endTouch.y = 0;
		};

		const keyboardActions = (e: KeyboardEvent) => {
			processDirection(e.code as ProcessKey, cellWidth);
		};

		document.body.addEventListener("keyup", keyboardActions);

		if (eventContainerRef.current) {
			eventContainerRef.current.addEventListener("touchstart", onTouchStart);
			eventContainerRef.current.addEventListener("touchmove", onTouchMove);
			eventContainerRef.current.addEventListener("touchend", onTouchEnd);
		}

		return () => {
			document.body.removeEventListener("keyup", keyboardActions);

			if (eventContainerRef.current) {
				eventContainerRef.current.removeEventListener("touchstart", onTouchStart);
				eventContainerRef.current.removeEventListener("touchmove", onTouchMove);
				eventContainerRef.current.removeEventListener("touchend", onTouchEnd);
			}

			if (containerRef.current) {
				const child = containerRef.current.children as HTMLCollectionOf<HTMLDivElement>;

				Array.from(child).forEach((element) => {
					element.style.transform = "translate(0px, 0px)";
					element.style.transition = TRANSITION_STYLE;
				});
			}
		};
	}, [cells, cellWidth]);

	useEffect(() => {
		if (currentScore > currentBestScore) {
			dispatch(setBestScore(currentScore));
		}

		//save to localStorage
		dispatch(localStorageSaveThunk());
	}, [cells, currentBestScore, currentScore]);

	return (
		<div className={s.container}>
			<div ref={eventContainerRef}>
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
			</div>

			{gameOver && (
				<div className={s.game_over}>
					<div className={s.game_over__inner}>
						<button className={s.game_over__button} onClick={() => dispatch(resetGame())}>
							{t("newGame")}
						</button>

						<div>{t("or")}</div>

						<button
							className={s.game_over__button}
							onClick={() => {
								// window.ysdk.adv.showRewardedVideo({
								// 	callbacks: {
								// 		onRewarded: () => {
								// 			dispatch(rollbackStep());
								// 		},
								// 		onError: () => {
								// 			dispatch(rollbackStep());
								// 		},
								// 	},
								// });
								dispatch(rollbackStep());
							}}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#f0ecf6"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
								<path d="M16 3l-4 4l-4 -4" />
								<path d="M15 7v13" />
								<path d="M18 15v.01" />
								<path d="M18 12v.01" />
							</svg>
							<div>{t("moves_back")}</div>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
