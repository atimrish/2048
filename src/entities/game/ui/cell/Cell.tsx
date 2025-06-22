import * as s from "./Cell.module.css";

type Props = {
	value: number;
	spawned: boolean;
	stacked: boolean;
};

export const Cell = (p: Props) => {
	return (
		<div className={s.cell} data-value={p.value} data-spawned={p.spawned}>
			{p.value}
		</div>
	);
};
