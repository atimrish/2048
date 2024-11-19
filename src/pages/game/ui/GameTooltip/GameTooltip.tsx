import * as s from "./GameTooltip.module.css";
import {CellsActionKind, useGameContext} from "@src/app/providers";

export const GameTooltip = () => {
    const {dispatchCells} = useGameContext()

    return (
        <>
            <div className={s.controls_block}>
                <div>Используйте стрелки для управления</div>
                <div>
                    <span
                        onClick={() => dispatchCells({type: CellsActionKind.NEW_GAME})}
                        className={s.new_game_button}
                    >Новая игра
                    </span>
                </div>
            </div>
        </>
    );
};