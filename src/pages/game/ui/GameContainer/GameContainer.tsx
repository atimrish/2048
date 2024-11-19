import * as s from './GameContainer.module.css'
import {GameHeading} from "../GameHeading";
import {GameTooltip} from "../GameTooltip";
import {Playground} from "../Playground";
import {useGameContext} from "@src/app/providers";
import {GameOverCover} from "@src/pages/game/ui/GameOverCover";

export const GameContainer = () => {
    const {gameOver} = useGameContext()

    return (
        <>
            <div className={s.container}>
                <GameHeading/>
                <GameTooltip/>
                <Playground/>
                {gameOver && <GameOverCover/>}
            </div>
        </>
    );
};