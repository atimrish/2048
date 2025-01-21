import {Cells} from "@src/entities/game/model";
import {randomNumber} from "@src/shared/lib/randomNumber";

type SpawnResult = {
    cells: Cells,
    spawnIndex: number
}

export const spawnCell = (cells: Cells): SpawnResult => {
    const newCells = structuredClone(cells)
    const value = randomNumber(0, 10) > 9 ? 4: 2
    const length = cells.flat().filter(i => i === 0).length
    const spawnIndex = randomNumber(0, length - 1)

    const result: SpawnResult = {
        cells: newCells,
        spawnIndex,
    }

    if (length > 0) {
        let currentIndex = 0
        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                if (cells[y][x] === 0) {
                    if (spawnIndex === currentIndex) {
                        newCells[y][x] = value
                        result.spawnIndex = y * cells.length + x
                        return result
                    }
                    currentIndex++
                }
            }
        }
    }

    return result
}