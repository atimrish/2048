import * as s from "./Scoreboard.module.css";
import {useAppSelector} from "@src/app/stores";
import {getBestScore, getScore} from "@src/features/game/model";
import FullscreenSrc from "@src/shared/ui/icons/fullscreen.svg";
import FullscreenExitSrc from "@src/shared/ui/icons/fullscreen-exit.svg";
import {MouseEvent, useEffect, useState} from "react";

export const Scoreboard = () => {
	const score = useAppSelector((state) => getScore(state));
	const bestScore = useAppSelector((state) => getBestScore(state));
	const [fullscreen, setFullscreen] = useState(Boolean(document.fullscreenElement));

	const onButtonPress = async (e: MouseEvent<HTMLButtonElement>) => {
		fullscreen ? await document.exitFullscreen() : await document.body.requestFullscreen({navigationUI: "hide"});
	};

	useEffect(() => {
		const onFullscreenChange = () => {
			setFullscreen(Boolean(document.fullscreenElement));
		};
		document.body.addEventListener("fullscreenchange", onFullscreenChange);

		return () => {
			document.body.removeEventListener("fullscreenchange", onFullscreenChange);
		};
	}, []);

	return (
		<div className={s.scoreboard}>
			<div>
				<div>Score: {score}</div>
				<div>Best score: {bestScore}</div>
			</div>

			<button className={s.fullscreen_button} onClick={onButtonPress}>
				<img src={fullscreen ? FullscreenExitSrc : FullscreenSrc} alt="" />
			</button>
		</div>
	);
};
