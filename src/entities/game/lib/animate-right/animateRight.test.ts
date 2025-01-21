import {animateRight} from './animateRight'
import {describe, expect, test} from "@jest/globals";
import {Cells, CellsAnimated} from "@src/entities/game/model";

describe('animateRight', () => {
    test('сдвиг вправо без стаков', () => {
        const cells: Cells = [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 2]
        ]

        const expectedCells: Cells = [
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(240px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)'],
            ['translate(0px, 0px)', 'translate(160px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)'],
            ['translate(0px, 0px)', 'translate(0px, 0px)', 'translate(80px, 0px)', 'translate(0px, 0px)'],
            ['translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)']
        ]

        expect(animateRight(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 0,
            stackedIndexes: [],
            hasMovedCell: true,
            hasStackedCell: false,
        })
    })

    test('сдвиг вправо co стаками', () => {
        const cells: Cells = [
            [2, 2, 2, 2],
            [2, 2, 2, 0],
            [0, 2, 0, 2],
            [2, 4, 0, 2]
        ]

        const expectedCells: Cells = [
            [0, 0, 4, 4],
            [0, 0, 2, 4],
            [0, 0, 0, 4],
            [0, 2, 4, 2]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(160px, 0px)', 'translate(80px, 0px)', 'translate(80px, 0px)', 'translate(0px, 0px)'],
            ['translate(160px, 0px)', 'translate(160px, 0px)', 'translate(80px, 0px)', 'translate(0px, 0px)'],
            ['translate(0px, 0px)', 'translate(160px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)'],
            ['translate(80px, 0px)', 'translate(80px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)']
        ]

        expect(animateRight(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 16,
            stackedIndexes: [2, 0, 5, 9],
            hasMovedCell: true,
            hasStackedCell: true,
        })
    })

    test('сдвиг вправо c несколькими стаками', () => {
        const cells: Cells = [
            [2, 2, 2, 4],
            [2, 2, 0, 4],
            [0, 4, 2, 4],
            [4, 4, 4, 2]
        ]

        const expectedCells: Cells = [
            [0, 2, 4, 4],
            [0, 0, 4, 4],
            [0, 4, 2, 4],
            [0, 4, 8, 2]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(80px, 0px)', 'translate(80px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)'],
            ['translate(160px, 0px)', 'translate(80px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)'],
            ['translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)'],
            ['translate(80px, 0px)', 'translate(80px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)']
        ]

        expect(animateRight(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 16,
            stackedIndexes: [1, 4, 13],
            hasMovedCell: true,
            hasStackedCell: true,
        })
    })
})