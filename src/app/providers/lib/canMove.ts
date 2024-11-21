import {TCellTableValues} from "@src/pages/game/lib";

export const canMove = (cells: TCellTableValues) => {
    for (const row of cells) {
        for (const rowElement of row) {
            if (rowElement === 0) return true
        }
    }
    return false
}
