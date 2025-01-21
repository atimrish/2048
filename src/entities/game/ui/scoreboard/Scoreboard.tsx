import * as s from './Scoreboard.module.css'
import {useAppSelector} from "@src/app/stores";
import {getScore} from "@src/entities/game/model";

export const Scoreboard = () => {
    const score = useAppSelector(state => getScore(state))

    return (
        <div className={s.scoreboard}>
            Счет: {score}
        </div>
    );
};