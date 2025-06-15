import * as s from './Cell.module.css'
import {CSSProperties} from "react";

type Props = {
    value: number,
    spawned: boolean,
    stacked: boolean
}

export const Cell = (p: Props) => {
    const css: CSSProperties = {
        visibility: p.value === 0 ? 'hidden' : 'visible',
        
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
            data-value={p.value}
        >
            {p.value}
        </div>
    );
};