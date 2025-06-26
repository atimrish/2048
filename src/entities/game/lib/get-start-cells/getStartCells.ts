import {spawnCell} from "@src/features/game/lib";

export const getStartCells = () => {
	const cells = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];

	let spawned = spawnCell(cells).cells;
	spawned = spawnCell(spawned).cells;

	return spawned;
};
