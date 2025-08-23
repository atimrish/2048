import {useAppDispatch, useAppSelector} from "@src/app/stores";
import {getBestScore, getScore, resetGame} from "@src/features/game/model";
import * as s from "./Scoreboard.module.css";
import {useTranslation} from "react-i18next";
type ScoreboardProps = {
	openModal: () => void;
};

export const Scoreboard = (p: ScoreboardProps) => {
	const score = useAppSelector((state) => getScore(state));
	const bestScore = useAppSelector((state) => getBestScore(state));
	const dispatch = useAppDispatch();

	const {t} = useTranslation()

	const onNewGameButtonPress = () => {
		dispatch(resetGame());
	};

	const onSettingsButtonPress = () => {
		p.openModal();
	};

	return (
		<div className={s.scoreboard}>
			<div className={s.scoreboard_panel}>
				<div className={s.scoreboard_panel_item}>
					<div className={s.scoreboard_panel_item_title}>{t('score')}</div>
					<div>{score}</div>
				</div>
				<div className={s.scoreboard_panel_item}>
					<div className={s.scoreboard_panel_item_title}>{t('bestScore')}</div>
					<div>{bestScore}</div>
				</div>
			</div>

			<div className={s.second_panel}>
				<button className={s.new_game_button} onClick={onNewGameButtonPress}>
					{t('newGame')}
				</button>

				<button className={s.settings_button} onClick={onSettingsButtonPress}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#0e0e10"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
						<path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
					</svg>
				</button>
			</div>
		</div>
	);
};
