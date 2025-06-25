import {configureStore} from "@reduxjs/toolkit";
import {gameSlice} from "@src/features/game/model";
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        [gameSlice.name]: gameSlice.reducer
    }
})

export type Store = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<Store>()
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()