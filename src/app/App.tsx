import {Playground} from "@src/entities/game/ui/playground";
import {GameProvider} from "@src/app/providers/GameProvider";
import {Scoreboard} from "@src/entities/game/ui/scoreboard";
import {GameContainer} from "@src/entities/game/ui/game-container";

export const App = () => {
    return (
        <>
            <GameProvider>
                <GameContainer>
                    <Scoreboard/>
                    <Playground/>
                </GameContainer>
            </GameProvider>
        </>
    )
};