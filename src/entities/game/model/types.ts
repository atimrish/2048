export type Cells = Array<Row>
export type Row = Array<number>
export type CellsAnimated = Array<Array<string>>

export type AnimatedResult = {
    animated: CellsAnimated,
    actual: Cells,
    score: number,
    stackedIndexes: number[]
}