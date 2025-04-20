import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IReducer {
    currentCurrency1: string,
    currentCurrency2: string
}

const initialState = {
    currentCurrencyValue1: '',
    currentCurrencyValue2: ''
}

const currentCurrenciesValues = createSlice({
    name: "currentCurrenciesValues",
    initialState,
    reducers: {
        setFirstCurrentCurrencyValue: (state: any, action: PayloadAction<string>) => {
            state.currentCurrencyValue1 = action.payload;
        },
        setSecondCurrentCurrencyValue: (state: any, action: PayloadAction<string>) => {
            state.currentCurrencyValue2 = action.payload;
        },
    }
})

export default currentCurrenciesValues.reducer;

export const { setFirstCurrentCurrencyValue, setSecondCurrentCurrencyValue } = currentCurrenciesValues.actions;

