import {animateLeft} from './animateLeft'
import {describe, expect, test} from "@jest/globals";
import {Cells, CellsAnimated} from "@src/entities/game/model";

describe('animateLeft', () => {
    test('сдвиг влево без стаков', () => {
        const cells: Cells = [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 2]
        ]

        const expectedCells: Cells = [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-0px, 0px)'],
            ['translate(-0px, 0px)', 'translate(-80px, 0px)', 'translate(-0px, 0px)', 'translate(-0px, 0px)'],
            ['translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-160px, 0px)', 'translate(-0px, 0px)'],
            ['translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-240px, 0px)']
        ]

        expect(animateLeft(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 0,
            stackedIndexes: [],
            hasMovedCell: true,
            hasStackedCell: false,
        })
    })

    test('сдвиг влево co стаками', () => {
        const cells: Cells = [
            [2, 2, 2, 2],
            [2, 2, 2, 0],
            [0, 2, 0, 2],
            [2, 4, 0, 2]
        ]

        const expectedCells: Cells = [
            [4, 4, 0, 0],
            [4, 2, 0, 0],
            [4, 0, 0, 0],
            [2, 4, 2, 0]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(-0px, 0px)', 'translate(-80px, 0px)', 'translate(-80px, 0px)', 'translate(-160px, 0px)'],
            ['translate(-0px, 0px)', 'translate(-80px, 0px)', 'translate(-80px, 0px)', 'translate(-0px, 0px)'],
            ['translate(-0px, 0px)', 'translate(-80px, 0px)', 'translate(-0px, 0px)', 'translate(-240px, 0px)'],
            ['translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-80px, 0px)']
        ]

        expect(animateLeft(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 16,
            stackedIndexes: [1, 3, 5, 11],
            hasMovedCell: true,
            hasStackedCell: true,
        })
    })

    test('сдвиг влево c несколькими стаками', () => {
        const cells: Cells = [
            [4, 2, 2, 2],
            [4, 0, 2, 2],
            [4, 2, 4, 0],
            [2, 4, 4, 4]
        ]

        const expectedCells: Cells = [
            [4, 4, 2, 0],
            [4, 4, 0, 0],
            [4, 2, 4, 0],
            [2, 8, 4, 0]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-80px, 0px)', 'translate(-80px, 0px)'],
            ['translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-80px, 0px)', 'translate(-160px, 0px)'],
            ['translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-0px, 0px)'],
            ['translate(-0px, 0px)', 'translate(-0px, 0px)', 'translate(-80px, 0px)', 'translate(-80px, 0px)']
        ]

        expect(animateLeft(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 16,
            stackedIndexes: [2, 7, 14],
            hasMovedCell: true,
            hasStackedCell: true,
        })
    })
})