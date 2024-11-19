import {TCellRowValues, TCellStackedRow, TCellTableValues, TCellValues, TTableStacked} from "@src/pages/game/lib";
import {padArrayEnd, padArrayStart} from "@src/shared/lib";
import {setEmptyTable} from "@src/app/providers/lib";

const filterRow = (row: TCellRowValues) => row.filter(i => i > 0)

const stackCells = (row: TCellRowValues): TCellStackedRow => {
    let [countStacks, score] = [0, 0]
    for (let i = 1; i < row.length; i++) {
        if (row[i - 1] === row[i]) {
            const addedScore = row[i - 1] + row[i] as TCellValues
            row[i - 1] = addedScore
            row[i] = 0
            score += addedScore
            countStacks++
        }
    }
    return [filterRow(row), countStacks, score]
}

const stackCellsReverse = (row: TCellRowValues): TCellStackedRow => {
    let [countStacks, score] = [0, 0]
    for (let i = row.length; i > 0; i--) {
        if (row[i - 1] === row[i]) {
            const added = row[i - 1] + row[i] as TCellValues
            row[i] = added
            row[i - 1] = 0
            score += added
            countStacks++
        }
    }
    return [filterRow(row), countStacks, score]
}

const cellsLeft = (cells: TCellTableValues): TTableStacked => {
    let [countStacks, score] = [0, 0]

    const newCells = cells.map(row => {
        const filtered = filterRow(row)
        const stacked = stackCells(filtered)
        countStacks += stacked[1]
        score += stacked[2]
        return padArrayEnd(stacked[0], 0, 4)
    })

    return [newCells, countStacks, score]
}

const cellsRight = (cells: TCellTableValues): TTableStacked => {
    let [countStacks, score] = [0, 0]

    const newCells = cells.map(row => {
        const filtered = filterRow(row)
        const stacked = stackCellsReverse(filtered)
        countStacks += stacked[1]
        score += stacked[2]
        return padArrayStart(stacked[0], 0, 4)
    })

    return [newCells, countStacks, score]
}

const cellsUp = (cells: TCellTableValues): TTableStacked => {
    const newCells = setEmptyTable()
    let [countStacks, score] = [0, 0]

    for (let x = 0; x < cells.length; x++) {
        const column = []
        for (let y = 0; y < cells[x].length; y++) {
            column.push(cells[y][x])
        }
        const filtered = filterRow(column as TCellRowValues)
        const stacked = stackCells(filtered)
        countStacks += stacked[1]
        score += stacked[2]

        padArrayEnd(stacked[0], 0, 4).forEach((item, index) => newCells[index][x] = item)
    }
    return [newCells, countStacks, score]
}

const cellsDown = (cells: TCellTableValues): TTableStacked => {
    const newCells = setEmptyTable()
    let [countStacks, score] = [0, 0]

    for (let x = 0; x < cells.length; x++) {
        const column = []
        for (let y = 0; y < cells[x].length; y++) {
            column.push(cells[y][x])
        }

        const filtered = filterRow(column as TCellRowValues)
        const stacked = stackCellsReverse(filtered)
        countStacks += stacked[1]
        score += stacked[2]

        padArrayStart(stacked[0], 0, 4).forEach((item, index) => newCells[index][x] = item)
    }
    return [newCells, countStacks, score]
}

export {cellsLeft, cellsRight, cellsUp, cellsDown}
