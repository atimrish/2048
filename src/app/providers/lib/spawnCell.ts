import {TCellTableValues} from "@src/pages/game/lib";
import {getCountEmptyCells} from "@src/app/providers/lib";
import {getRandomNumber} from "@src/shared/lib";

const spawnRandomly = () => getRandomNumber(1, 10) > 9 ? 4 : 2

type TSpawnedCells = {
    cells: TCellTableValues,
    spawned: boolean,
    spawnedIndex: number
}

const spawnCell = (cells: TCellTableValues): TSpawnedCells => {
    const countEmptyCells = getCountEmptyCells(cells)

    if (countEmptyCells > 0) {
        let [counter, globalCounter] = [0, 0]
        const index = getRandomNumber(0, countEmptyCells - 1)

        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                if (cells[y][x] === 0) {
                    if (index === counter) {
                        cells[y][x] = spawnRandomly()
                        return {cells, spawned: true, spawnedIndex: globalCounter}
                    }
                    counter++
                }
                globalCounter++
            }
        }
    }

    return {
        cells,
        spawned: false,
        spawnedIndex: -1
    }
}

export {spawnCell}