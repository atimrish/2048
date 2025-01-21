import {Playground} from "@src/entities/game/ui/playground/Playground";
import {GameProvider} from "@src/app/providers/GameProvider";

export const App = () => {
    return (
        <>
            <GameProvider>
                <Playground/>
            </GameProvider>
        </>
    )
};