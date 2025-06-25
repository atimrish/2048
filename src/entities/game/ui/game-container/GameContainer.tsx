import * as s from "./GameContainer.module.css";
import {PropsWithChildren} from "react";
import {useAppDispatch, useAppSelector} from "@src/app/stores";
import {getGameOver, resetGame} from "@src/features/game/model";

export const GameContainer = (p: PropsWithChildren) => {
	const gameOver = useAppSelector((state) => getGameOver(state));
	const dispatch = useAppDispatch();

	return (
		<div className={s.container}>
			{p.children}

			{gameOver && (
				<div className={s.game_over} onClick={() => dispatch(resetGame())}>
					New game
				</div>
			)}
		</div>
	);
};
