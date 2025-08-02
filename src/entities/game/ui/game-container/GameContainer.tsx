import { PropsWithChildren } from "react";
import * as s from "./GameContainer.module.css";

export const GameContainer = (p: PropsWithChildren) => {
		return (
		<div className={s.container}>
			{p.children}
		</div>
	);
};
