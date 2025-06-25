import {AnimatedResult, Cells, CellsAnimated} from "@src/features/game/model";
import {gameConfig} from "@src/entities/game/config";

export const animateRight = (cells: Cells): AnimatedResult => {
    const animated: CellsAnimated = Array.from({length: 4}, () => new Array(4).fill(''))
    const actual: Cells = structuredClone(cells)
    let score = 0
    const stackedIndexes: number[] = []
    let hasMovedCell = false
    let hasStackedCell = false

    for (let y = 0; y < cells.length; y++) {
        let stackIndex = -1

        for (let x = cells[y].length - 1; x >= 0; x--) {
            //кол-во сдвинутых клеток
            let movementCells = 0

            for (let i = x + 1; i < actual[y].length; i++) {
                if (actual[y][i] === 0) {
                    if (actual[y][i - 1] === 0) {
                        break
                    }

                    //передвигаем число на клетку вправо
                    actual[y][i] = actual[y][i - 1]
                    //клетку перед ней приравниваем к 0
                    actual[y][i - 1] = 0
                    movementCells++
                    hasMovedCell = true
                }
                if (actual[y][i] === actual[y][i - 1] && i !== stackIndex && i - 1 !== stackIndex) {
                    //stack
                    actual[y][i] += actual[y][i - 1]
                    //добавляем очки
                    score += actual[y][i]
                    actual[y][i - 1] = 0
                    stackIndex = i
                    movementCells++
                    stackedIndexes.push(y * cells.length + x)
                    hasStackedCell = true
                    break
                }
            }

            const pixelsToRight = movementCells * (gameConfig.gap + gameConfig.size)
            animated[y][x] = `translate(${pixelsToRight}px, 0px)`
        }
    }

    return { actual, animated, score, stackedIndexes, hasStackedCell, hasMovedCell }
}