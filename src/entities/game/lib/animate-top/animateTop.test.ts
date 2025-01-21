import {animateTop} from './animateTop'
import {describe, expect, test} from "@jest/globals";
import {Cells, CellsAnimated} from "@src/entities/game/model";

describe('animateTop', () => {
    test('сдвиг вверх без стаков', () => {
        const cells: Cells = [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 2]
        ]

        const expectedCells: Cells = [
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(0px, -0px)', 'translate(0px, -0px)', 'translate(0px, -0px)', 'translate(0px, -0px)'],
            ['translate(0px, -0px)', 'translate(0px, -80px)', 'translate(0px, -0px)', 'translate(0px, -0px)'],
            ['translate(0px, -0px)', 'translate(0px, -0px)', 'translate(0px, -160px)', 'translate(0px, -0px)'],
            ['translate(0px, -0px)', 'translate(0px, -0px)', 'translate(0px, -0px)', 'translate(0px, -240px)']
        ]

        expect(animateTop(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 0,
            stackedIndexes: [],
            hasMovedCell: true,
            hasStackedCell: false,
        })
    })

    test('сдвиг вверх co стаками', () => {
        const cells: Cells = [
            [2, 4, 0, 2],
            [0, 2, 0, 2],
            [2, 2, 2, 0],
            [2, 2, 2, 2]
        ]

        const expectedCells: Cells = [
            [4, 4, 4, 4],
            [2, 4, 0, 2],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ]

        const expectedAnimated: CellsAnimated = [
            ['translate(0px, -0px)', 'translate(0px, -0px)', 'translate(0px, -0px)', 'translate(0px, -0px)'],
            ['translate(0px, -0px)', 'translate(0px, -0px)', 'translate(0px, -0px)', 'translate(0px, -80px)'],
            ['translate(0px, -160px)', 'translate(0px, -80px)', 'translate(0px, -160px)', 'translate(0px, -0px)'],
            ['translate(0px, -160px)', 'translate(0px, -80px)', 'translate(0px, -240px)', 'translate(0px, -160px)']
        ]

        expect(animateTop(cells)).toEqual({
            animated: expectedAnimated,
            actual: expectedCells,
            score: 16,
            stackedIndexes: [8, 9, 14, 7],
            hasMovedCell: true,
            hasStackedCell: true,
        })
    })
})