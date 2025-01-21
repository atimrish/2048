import {Playground} from "@src/entities/game/ui/playground/Playground";
import {GameProvider} from "@src/app/providers/GameProvider";
import {Scoreboard} from "@src/entities/game/ui/scoreboard/Scoreboard";

export const App = () => {
    return (
        <>
            <GameProvider>
                <Scoreboard/>
                <Playground/>
            </GameProvider>
        </>
    )
};