import {TCellTableValues} from "@src/pages/game/lib";

const getCountEmptyCells = (cells: TCellTableValues) => cells.flat().filter(i => i === 0).length

export  {getCountEmptyCells}
