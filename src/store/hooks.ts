import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store"


type DispatchFunction = () => AppDispatch;

export const useEventsDispatch: DispatchFunction = useDispatch;
export const useEventsSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthDispatch: DispatchFunction = useDispatch;
export const useAuthSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCartDispatch: DispatchFunction = useDispatch;
export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;
