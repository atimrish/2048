export enum CellsActionKind {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    UP = 'UP',
    DOWN = 'DOWN',
    SPAWN = 'SPAWN',
}

export interface ICellsAction {
    type: CellsActionKind,
}