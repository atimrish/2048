import {checkCanMove} from "./checkCanMove";
import {describe, expect, test} from "@jest/globals";
import {Cells} from "@src/features/game/model";

describe("canCheck", () => {
	test("проверка на пустых клетках", () => {
		const cells: Cells = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];

		expect(checkCanMove(cells)).toBeTruthy();
	});

    test("проверка на одну пустую клетку", () => {
		const cells: Cells = [
			[2, 4, 2, 4],
			[4, 2, 4, 2],
			[2, 4, 2, 4],
			[4, 2, 4, 0],
		];

		expect(checkCanMove(cells)).toBeTruthy();
	});

	test("проверка на заполненных клетках", () => {
		const cells: Cells = [
			[2, 4, 2, 4],
			[4, 2, 4, 2],
			[2, 4, 2, 4],
			[4, 2, 4, 2],
		];

		expect(checkCanMove(cells)).toBeFalsy();
	});

	test("проверка на один возможный ход по горизонтали", () => {
		const cells: Cells = [
			[2, 4, 2, 2],
			[4, 2, 4, 8],
			[2, 4, 2, 4],
			[4, 2, 4, 2],
		];

		expect(checkCanMove(cells)).toBeTruthy();
	});

    test("проверка на один возможный ход по вертикали", () => {
		const cells: Cells = [
			[2, 4, 8, 2],
			[4, 2, 4, 2],
			[2, 4, 2, 4],
			[4, 2, 4, 2],
		];

		expect(checkCanMove(cells)).toBeTruthy();
	});
});
