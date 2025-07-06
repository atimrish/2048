import {Cells} from "@src/features/game/model";

export const checkCanMove = (cells: Cells): boolean => {
	//проверка на наличие пустых клеток
	for (let i = 0; i < cells.length; i++) {
		for (let j = 0; j < cells[i].length; j++) {
			if (cells[i][j] === 0) {
				return true;
			}
		}
	}

    //проверка соседних одинаковых клеток
	for (let i = 0; i < cells.length; i++) {
		for (let j = 0; j < cells[i].length - 1; j++) {
			if (cells[i][j] === cells[i][j + 1]) {
				return true;
			}

			if (cells[j][i] === cells[j + 1][i]) {
				return true;
			}
		}
	}

	return false;
};
