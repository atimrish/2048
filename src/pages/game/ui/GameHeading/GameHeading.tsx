import * as s from "./GameHeading.module.css";
import {useGameContext} from "@src/app/providers";
import {LocalStorageKeys} from "@src/shared/config";

export const GameHeading = () => {
    const {value} = useGameContext()

    return (
        <>
            <div className={s.heading_container}>
                <div className={s.text_2048}>2048</div>
                <div className={s.heading_block}>
                    <div>счет</div>
                    <div>{value[2]}</div>
                </div>
                <div className={s.heading_block}>
                    <div>рекорд</div>
                    <div>{localStorage.getItem(LocalStorageKeys.TOP_VALUE) || 0}</div>
                </div>
            </div>
        </>
    );
};
