import {TTableStacked} from "@src/pages/game/lib";
import {ICellsAction} from "@src/app/providers";
import {Dispatch} from "react";

export type TGameContext = {
    value: TTableStacked
    dispatchCells: Dispatch<ICellsAction>,
    gameOver: boolean,
    spawnedIndex: number
}
