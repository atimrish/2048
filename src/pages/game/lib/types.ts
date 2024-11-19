export type TCellValues = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048

export type TCellRowValues = TCellValues[]
export type TCellTableValues = TCellRowValues[]
export type TCellOptions = {
    spawned: boolean
}

export type TCell = {
    value: TCellValues,
    options?: TCellOptions,
}

type countStacks = number
type score = number

export type TCellStackedRow = [TCellRowValues, countStacks, score]
export type TTableStacked = [TCellTableValues, countStacks, score]