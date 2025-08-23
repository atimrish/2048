import { GameProvider } from "@src/app/providers/GameProvider";
import { GameContainer } from "@src/entities/game/ui/game-container";

export const App = () => {
	return (
		<>
			<GameProvider>
				<GameContainer/>
			</GameProvider>
		</>
	);
};
