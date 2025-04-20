import { createSlice, PayloadAction }  from '@reduxjs/toolkit'

const initialState = {
    ValCurs: null
}

const currenciesReducer = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        AddCurrencies: (state: any, action: PayloadAction<string>) => {
            state.ValCurs = action.payload
            console.log(state.ValCurs);
            
        }
    }
})

export default currenciesReducer.reducer;

export const { AddCurrencies } = currenciesReducer.actions