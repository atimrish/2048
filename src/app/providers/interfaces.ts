export enum CellsActionKind {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    UP = 'UP',
    DOWN = 'DOWN',
    SPAWN = 'SPAWN',
    NEW_GAME = 'NEW_GAME',
}

export interface ICellsAction {
    type: CellsActionKind,
}