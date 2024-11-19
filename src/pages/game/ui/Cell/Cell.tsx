import {getColor, TCell} from '@src/pages/game/lib'
import * as s from './Cell.module.css'
import {CSSProperties} from "react";

export const Cell = (p: TCell) => {
    const color = getColor(p.value)
    const styles: CSSProperties = {
        backgroundColor: color
    }

    if (p.value > 64) {
        styles.boxShadow =
         `color-mix(in srgb, ${color} 40%, transparent) 0px 54px 65px,
         color-mix(in srgb, ${color} 27%, transparent) 0px -12px 40px,
         color-mix(in srgb, ${color} 14%, transparent) 0px 4px 16px,
         color-mix(in srgb, ${color} 20%, transparent) 0px 12px 23px,
         color-mix(in srgb, ${color} 11%, transparent) 0px -3px 15px`
    }

    const classNames = [s.cell]
    if (p.options?.spawned) {
        classNames.push(s.spawned)
    }

    return (
        <div
            className={classNames.join(' ')}
            style={styles}>
            {p.value === 0 ? '' : p.value}
        </div>
    );
};