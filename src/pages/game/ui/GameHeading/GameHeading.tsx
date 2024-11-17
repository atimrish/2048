import * as s from "./GameHeading.module.css";

export const GameHeading = () => {
    return (
        <>
            <div className={s.heading_container}>
                <div className={s.text_2048}>2048</div>
                <div className={s.heading_block}>
                    <div>счет</div>
                    <div>0</div>
                </div>
                <div className={s.heading_block}>
                    <div>рекорд</div>
                    <div>0</div>
                </div>
            </div>
        </>
    );
};
