import {describe, expect, test} from "@jest/globals";
import {Cells} from "@src/entities/game/model";
import {getEmptyCells, spawnCell} from "@src/entities/game/lib";

describe('SpawnCell', () => {
    test("Спавн клеток (пустое поле)", () => {
        const cells = getEmptyCells()

        for (let i = 0; i < 10; i++) {
            expect(spawnCell(cells).cells).not.toEqual(cells)
        }
    })

    test("Спавн клеток (заполненное поле)", () => {
        const cells: Cells = [
            [4,4,4,4],
            [4,4,4,4],
            [4,4,4,4],
            [4,4,4,4]
        ]

        for (let i = 0; i < 10; i++) {
            expect(spawnCell(cells).cells).toEqual(cells)
        }
    })

    test("Спавн клеток (спавн на той же клетке)", () => {
        const cells = getEmptyCells()

        for (let i = 0; i < 100; i++) {
            let spawned = spawnCell(cells).cells
            spawned = spawnCell(spawned).cells
            const length = spawned.flat().filter(i => i !== 0).length
            expect(length).toBe(2)
        }
    })

    test("Спавн клеток (спавн на той же клетке 2)", () => {
        const cells = getEmptyCells()

        for (let i = 0; i < 100; i++) {
            let spawned = spawnCell(cells).cells
            spawned = spawnCell(spawned).cells
            spawned = spawnCell(spawned).cells
            const length = spawned.flat().filter(i => i !== 0).length
            expect(length).toBe(3)
        }
    })
})