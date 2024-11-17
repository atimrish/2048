import {getColor, TCell} from '../../lib'
import * as s from './Cell.module.css'

export const Cell = (p: TCell) => {
    return (
        <div className={s.cell} style={{backgroundColor: getColor(p.value)}}>
            {p.value === 0 ? '' : p.value}
        </div>
    );
};