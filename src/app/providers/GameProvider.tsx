import {PropsWithChildren} from "react";
import {Provider} from "react-redux";
import {store} from "@src/app/stores";

export const GameProvider = (p: PropsWithChildren) => {
    return (
        <Provider store={store}>
            {p.children}
        </Provider>
    );
};