import {spawnCell} from "@src/features/game/lib";
import {Cells} from "@src/features/game/model";

type StartCells = {
	cells: Cells;
	spawnedIndexes: Record<number, boolean>;
};

export const getStartCells = (): StartCells => {
	const cells = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];

	const spawnedIndexes: StartCells["spawnedIndexes"] = {};

	let spawned = spawnCell(cells);
	spawnedIndexes[spawned.spawnIndex] = true;
	spawned = spawnCell(spawned.cells);
	spawnedIndexes[spawned.spawnIndex] = true;

	return {cells: spawned.cells, spawnedIndexes};
};
