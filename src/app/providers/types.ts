import {TCellTableValues} from "@src/pages/game/lib";
import {ICellsAction} from "@src/app/providers";
import {Dispatch} from "react";

export type TGameContext = {
    cells: TCellTableValues,
    dispatchCells: Dispatch<ICellsAction>,
}
