import {GamePage} from "../pages/game/ui";
import {GameProvider} from "./providers";

export const App = () => {
    return (
        <GameProvider>
            <GamePage/>
        </GameProvider>
    )
};