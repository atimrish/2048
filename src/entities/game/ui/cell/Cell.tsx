import {useEffect, useRef} from "react";
import * as s from "./Cell.module.css";
import {requestAnimationTimeout} from "@src/shared/lib";

type Props = {
	value: number;
	spawned: boolean;
	stacked: boolean;
};

export const Cell = (p: Props) => {
	const cellRef = useRef<HTMLDivElement>(null);

	return (
		<div className={s.cell} data-value={p.value} data-spawned={p.spawned} ref={cellRef}>
			{p.value}
		</div>
	);
};
