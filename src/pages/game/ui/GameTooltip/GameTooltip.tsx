import * as s from "./GameTooltip.module.css";

export const GameTooltip = () => {
    return (
        <>
            <div className={s.controls_block}>
                <div>Используйте стрелки для управления</div>
                <div>Новая игра</div>
            </div>
        </>
    );
};