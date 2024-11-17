import {TCellRowValues, TCellTableValues, TCellValues} from "@src/pages/game/lib";
import {padArrayEnd, padArrayStart} from "@src/shared/lib";
import {setEmptyTable} from "@src/app/providers/lib";

const filterRow = (row: TCellRowValues) => row.filter(i => i > 0)

const stackCells = (row: TCellRowValues): TCellRowValues => {
    for (let i = 1; i < row.length; i++) {
        if (row[i - 1] === row[i]) {
            row[i - 1] = row[i - 1] + row[i] as TCellValues
            row[i] = 0
        }
    }
    return filterRow(row)
}

const stackCellsReverse = (row: TCellRowValues): TCellRowValues => {
    for (let i = row.length; i > 0; i--) {
        if (row[i - 1] === row[i]) {
            row[i] = row[i - 1] + row[i] as TCellValues
            row[i - 1] = 0
        }
    }
    return filterRow(row)
}

const cellsLeft = (cells: TCellTableValues): TCellTableValues => {
    return cells.map(row => {
        const filtered = filterRow(row)
        return padArrayEnd(stackCells(filtered), 0, 4)
    })
}

const cellsRight = (cells: TCellTableValues): TCellTableValues => {
    return cells.map(row => {
        const filtered = filterRow(row)
        return padArrayStart(stackCellsReverse(filtered), 0, 4)
    })
}

const cellsUp = (cells: TCellTableValues): TCellTableValues => {
    const newCells = setEmptyTable()

    for (let x = 0; x < cells.length; x++) {
        const column = []
        for (let y = 0; y < cells[x].length; y++) {
            column.push(cells[y][x])
        }
        const filtered = filterRow(column as TCellRowValues)
        padArrayEnd(stackCells(filtered), 0, 4)
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

        const filtered = filterRow(column as TCellRowValues)
        padArrayStart(stackCellsReverse(filtered), 0, 4)
            .forEach((item, index) => newCells[index][x] = item)
    }
    return newCells
}

export {cellsLeft, cellsRight, cellsUp, cellsDown}
