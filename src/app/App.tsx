import { GameProvider } from "@src/app/providers/GameProvider";
import { GameContainer } from "@src/entities/game/ui/game-container";
import '@src/app/i18n/i18n'

export const App = () => {
	return (
		<>
			<GameProvider>
				<GameContainer/>
			</GameProvider>
		</>
	);
};
