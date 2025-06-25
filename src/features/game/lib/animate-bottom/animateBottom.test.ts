import {animateBottom} from './animateBottom'
import {describe, expect, test} from "@jest/globals";
import {Cells, CellsAnimated} from "@src/features/game/model";

describe('animateBottom', () => {
    test('сдвиг вниз без стаков', () => {
        const cells: Cells = [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 2]
        ]

        const expectedCells: Cells = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 2, 2, 2]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(0px, 240px)', 'translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)'],
            ['translate(0px, 0px)', 'translate(0px, 160px)', 'translate(0px, 0px)', 'translate(0px, 0px)'],
            ['translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 80px)', 'translate(0px, 0px)'],
            ['translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)']
        ]

        expect(animateBottom(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 0,
            stackedIndexes: [],
            hasMovedCell: true,
            hasStackedCell: false,
        })
    })

    test('сдвиг вниз co стаками', () => {
        const cells: Cells = [
            [2, 2, 2, 2],
            [2, 2, 2, 0],
            [0, 2, 0, 2],
            [2, 4, 0, 2]
        ]

        const expectedCells: Cells = [
            [0, 0, 0, 0],
            [0, 2, 0, 0],
            [2, 4, 0, 2],
            [4, 4, 4, 4]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(0px, 160px)', 'translate(0px, 80px)', 'translate(0px, 240px)', 'translate(0px, 160px)'],
            ['translate(0px, 160px)', 'translate(0px, 80px)', 'translate(0px, 160px)', 'translate(0px, 0px)'],
            ['translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 80px)'],
            ['translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)', 'translate(0px, 0px)']
        ]

        expect(animateBottom(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 16,
            stackedIndexes: [4, 5, 2, 11],
            hasMovedCell: true,
            hasStackedCell: true,
        })
    })
})