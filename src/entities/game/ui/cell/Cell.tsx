import * as s from './Cell.module.css'
import {getColor} from "@src/shared/lib";
import {CSSProperties} from "react";

type Props = {
    value: number,
    spawned: boolean,
    stacked: boolean
}

export const Cell = (p: Props) => {
    const css: CSSProperties = {
        visibility: p.value === 0 ? 'hidden' : 'visible',
        backgroundColor: getColor(p.value)
    }

    const classes = [s.cell]

    if (p.spawned) {
        css.transition = 'none'
        classes.push(s.spawned)
    }

    if (p.stacked) {
        css.transition = 'none'
    }

    return (
        <div
            className={classes.join(' ')}
            style={css}
        >
            {p.value}
        </div>
    );
};