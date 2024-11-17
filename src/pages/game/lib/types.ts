export type TCellValues = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048

export type TCellRowValues = TCellValues[]

export type TCellTableValues = TCellRowValues[]

export type TCell = {
    value: TCellValues
}