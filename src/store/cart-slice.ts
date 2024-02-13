import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentType, TicketType } from "../utils/types";

type TicketTypes = {
    ticketType: TicketType;
    quantity: number;
}

type CartState = {
    eventId: string | null;
    ticketTypes: TicketTypes[];
    paymentType: PaymentType;
    totalPrice: number;
}

const initialState: CartState = {
    eventId: null,
    ticketTypes: [],
    paymentType: "CREDIT_CARD",
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addEvent: (state, action: PayloadAction<{ eventId: string; ticketTypes: TicketTypes[]; totalPrice: number }>) => {
        state.eventId = action.payload.eventId;
        state.ticketTypes = action.payload.ticketTypes;
        state.totalPrice = action.payload.totalPrice;
      },
      updatePaymentType: (state, action: PayloadAction<PaymentType>) => {
        state.paymentType = action.payload;
      },
      resetCart: (state) => {
        state.eventId = null;
        state.paymentType = "CREDIT_CARD";
        state.ticketTypes = [];
        state.totalPrice = 0;
      }
    },
  });

  export const { addEvent, updatePaymentType, resetCart } = cartSlice.actions

