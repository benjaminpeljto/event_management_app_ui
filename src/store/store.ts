import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice } from "./events-slice";
import { authSlice } from "./auth-slice";
import { cartSlice } from "./cart-slice";

export const store = configureStore({
    reducer: {
        events: eventsSlice.reducer,
        auth: authSlice.reducer,
        cart: cartSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;