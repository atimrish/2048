import {useAppDispatch, useAppSelector} from "@src/app/stores";
import {getBestScore, getScore, resetGame} from "@src/features/game/model";
import * as s from "./Scoreboard.module.css";

export const Scoreboard = () => {
	const score = useAppSelector((state) => getScore(state));
	const bestScore = useAppSelector((state) => getBestScore(state));

	const dispatch = useAppDispatch();

	const onButtonPress = () => {
		dispatch(resetGame());
	};

	const onTouchStart = (e: React.TouchEvent) => {
		e.stopPropagation();
	};

	const onTouchEnd = (e: React.TouchEvent) => {
		e.stopPropagation();
	};

	return (
		<div className={s.scoreboard}>
			<div>
				<div>Score: {score}</div>
				<div>Best score: {bestScore}</div>
			</div>

			<button
				className={s.new_game_button}
				onClick={onButtonPress}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}>
				New game
			</button>
		</div>
	);
};
