import {useState} from "react";
import {Playground} from "../playground";
import {Scoreboard} from "../scoreboard";
import * as s from "./GameContainer.module.css";
import {ANIMATION_SPEEDS} from "@src/features/game/config";
import {useAppDispatch, useAppSelector} from "@src/app/stores";
import {getAnimationSpeed, setAnimationSpeed} from "@src/features/game/model";
import { requestAnimationTimeout } from "@src/shared/lib";

export const GameContainer = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalClasses, setModalClasses] = useState([s.modal]);
	const dispatch = useAppDispatch();
	const currentAnimationSpeed = useAppSelector((state) => getAnimationSpeed(state));

	return (
		<div className={s.container}>
			<Scoreboard openModal={() => setModalOpen(true)} />
			<Playground />

			{modalOpen && (
				<div className={modalClasses.join(' ')}>
					<div className={s.modal__panel}>
						<button
							className={s.modal__panel__close_button}
							onClick={() => {
								setModalClasses([...modalClasses, s.modal_out])

								requestAnimationTimeout(() => {
									setModalOpen(false);
									setModalClasses([s.modal])
								}, 150)
							}}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#0e0e10"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M18 6l-12 12" />
								<path d="M6 6l12 12" />
							</svg>
						</button>
					</div>

					<h3 className={s.modal__header}>Animation speed</h3>

					<div className={s.modal__speed_block}>
						{Object.entries(ANIMATION_SPEEDS).map(([key, value]) => (
							<button
								className={s.modal__speed_button}
								onClick={() => dispatch(setAnimationSpeed(value))}
								data-selected={currentAnimationSpeed === value}>
								{key}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
