import * as s from './Scoreboard.module.css'
import {useAppSelector} from "@src/app/stores";
import {getBestScore, getScore} from "@src/entities/game/model";

export const Scoreboard = () => {
    const score = useAppSelector(state => getScore(state))
    const bestScore = useAppSelector(state => getBestScore(state))

    return (
        <div className={s.scoreboard}>
            <div>Счет: {score}</div>
            <div>Рекорд: {bestScore}</div>
        </div>
    );
};