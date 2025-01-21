import {AnimatedResult, Cells, CellsAnimated} from "@src/entities/game/model";
import {gameConfig} from "@src/entities/game/config";

export const animateBottom = (cells: Cells): AnimatedResult => {
    const animated: CellsAnimated = Array.from({length: 4}, () => new Array(4).fill(''))
    const actual: Cells = structuredClone(cells)
    let score = 0
    const stackedIndexes: number[] = []

    for (let x = 0; x < cells.length; x++) {
        let stackIndex = -1

        for (let y = cells[x].length - 1; y >= 0; y--) {
            //кол-во сдвинутых клеток
            let movementCells = 0

            for (let i = y + 1; i < cells[x].length; i++) {
                if (actual[i][x] === 0) {
                    if (actual[i - 1][x] === 0) {
                        break
                    }

                    //передвигаем число на клетку вниз
                    actual[i][x] = actual[i - 1][x]
                    //клетку перед ней приравниваем к 0
                    actual[i - 1][x] = 0
                    movementCells++
                }
                if (actual[i][x] === actual[i - 1][x] && i !== stackIndex && i - 1 !== stackIndex) {
                    //stack
                    actual[i][x] += actual[i - 1][x]
                    //добавляем очки
                    score += actual[i][x]
                    actual[i - 1][x] = 0
                    stackIndex = i
                    movementCells++
                    stackedIndexes.push(y * cells.length + x)
                    break
                }
            }

            const pixelsToBottom = movementCells * (gameConfig.gap + gameConfig.size)
            animated[y][x] = `translate(0px, ${pixelsToBottom}px)`
        }
    }

    return { actual, animated, score, stackedIndexes }
}