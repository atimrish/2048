import * as s from './GameContainer.module.css'
import {GameHeading} from "../GameHeading";
import {GameTooltip} from "../GameTooltip";
import {Playground} from "../Playground";

export const GameContainer = () => {
    return (
        <>
            <div className={s.container}>
                <GameHeading/>
                <GameTooltip/>
                <Playground/>
            </div>
        </>
    );
};