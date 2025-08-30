import {GameProvider} from "@src/app/providers/GameProvider";
import {GameContainer} from "@src/entities/game/ui/game-container";
import {useEffect} from "react";

export const App = () => {
	useEffect(() => {
		const preventContextMenuEvent = (e: MouseEvent) => {
			e.preventDefault();
		};

		document.body.addEventListener("contextmenu", preventContextMenuEvent);

		return () => {
			document.body.removeEventListener("contextmenu", preventContextMenuEvent);
		};
	}, []);

	return (
		<>
			<GameProvider>
				<GameContainer />
			</GameProvider>
		</>
	);
};
