import * as s from './Playground.module.css'
import {Cell} from "../Cell";
import {CellsActionKind, useGameContext} from "@src/app/providers";
import {useEffect} from "react";

export const Playground = () => {
    const {value, dispatchCells} = useGameContext()
    const flat = value[0].flat()

    const handleKeyPress = (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowUp":
                dispatchCells({type: CellsActionKind.UP})
                dispatchCells({type: CellsActionKind.SPAWN})
                break
            case "ArrowDown":
                dispatchCells({type: CellsActionKind.DOWN})
                dispatchCells({type: CellsActionKind.SPAWN})
                break
            case "ArrowLeft":
                dispatchCells({type: CellsActionKind.LEFT})
                dispatchCells({type: CellsActionKind.SPAWN})
                break
            case "ArrowRight":
                dispatchCells({type: CellsActionKind.RIGHT})
                dispatchCells({type: CellsActionKind.SPAWN})
                break
        }
    }

    useEffect(() => {
        dispatchCells({type: CellsActionKind.SPAWN})
        dispatchCells({type: CellsActionKind.SPAWN})
    }, []);

    useEffect(() => {
        document.body.addEventListener('keyup', handleKeyPress)
        return () => document.body.removeEventListener('keyup', handleKeyPress)
    }, []);

    return (
        <>
            <div className={s.container}>
                {flat.map((value, index) => <Cell value={value} key={index} />)}
            </div>
        </>
    );
};