import * as s from './GameOver.module.css'
import {CellsActionKind, useGameContext} from "@src/app/providers";

export const GameOverCover = () => {
    const {dispatchCells} = useGameContext()

    return (
        <div className={s.cover}>
            <div onClick={() => dispatchCells({type: CellsActionKind.NEW_GAME})}>Новая игра</div>
        </div>
    );
};