import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { EventDetails } from "../utils/types";


type eventsState = {
    events: EventDetails[],
    loading: boolean,
    error: string | null
}

const initialState: eventsState = {
    events: [],
    loading: false,
    error: null
}

export const eventsSlice = createSlice({
    name: "events",
    initialState: initialState,
    reducers: {
        fetchEventsStart(state){
            state.loading = true;
            state.error = null;
        },
        fetchEventsSuccess(state, action: PayloadAction<EventDetails[]>){
            state.loading = false;
            state.events = action.payload
        },
        fetchEventsError(state, action: PayloadAction<string>){
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const { fetchEventsStart, fetchEventsSuccess, fetchEventsError } = eventsSlice.actions;