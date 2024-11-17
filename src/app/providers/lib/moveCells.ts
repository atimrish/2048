import {TCellTableValues} from "@src/pages/game/lib";
import {padArrayEnd, padArrayStart} from "@src/shared/lib";
import {setEmptyTable} from "@src/app/providers/lib/setEmptyTable";

const cellsLeft = (cells: TCellTableValues): TCellTableValues => {
    return cells.map(row => {
        const filtered = row.filter(i => i > 0)
        return padArrayEnd(filtered, 0, 4)
    })
}

const cellsRight = (cells: TCellTableValues): TCellTableValues => {
    return cells.map(row => {
        const filtered = row.filter(i => i > 0)
        return padArrayStart(filtered, 0, 4)
    })
}

const cellsUp = (cells: TCellTableValues): TCellTableValues => {
    const newCells = setEmptyTable()

    for (let x = 0; x < cells.length; x++) {
        const column = []
        for (let y = 0; y < cells[x].length; y++) {
            column.push(cells[y][x])
        }

        padArrayEnd(column.filter(i => i > 0), 0, 4)
            .forEach((item, index) => newCells[index][x] = item)
    }
    return newCells
}

const cellsDown = (cells: TCellTableValues): TCellTableValues => {
    const newCells = setEmptyTable()

    for (let x = 0; x < cells.length; x++) {
        const column = []
        for (let y = 0; y < cells[x].length; y++) {
            column.push(cells[y][x])
        }

        padArrayStart(column.filter(i => i > 0), 0, 4)
            .forEach((item, index) => newCells[index][x] = item)
    }
    return newCells
}

export {cellsLeft, cellsRight, cellsUp, cellsDown}
