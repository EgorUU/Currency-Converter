import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IReducer {
    currentCurrency1: string,
    currentCurrency2: string
}

const initialState = {
    currentCurrency1: "USD",
    currentCurrency2: "RUB"
}

const reducer1 = createSlice({
    name: "currentCurrencies",
    initialState,
    reducers: {
        setFirstCurrentCurrency: (state, action: PayloadAction<string>) => {
            state.currentCurrency1 = action.payload;
        },
        setSecondCurrentCurrency: (state, action: PayloadAction<string>) => {
            state.currentCurrency2 = action.payload;
        },
    }
})

export default reducer1.reducer;

export const { setFirstCurrentCurrency, setSecondCurrentCurrency } = reducer1.actions;

