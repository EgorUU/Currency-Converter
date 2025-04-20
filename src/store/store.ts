import { configureStore } from "@reduxjs/toolkit";

import reducer1 from "./reducers/currentCurrencyes";

import currenciesReducer from './reducers/currenciesReducer'

import currentCurrenciesValues from './reducers/currentValues'

const store = configureStore({
    reducer: {
        currentCurrency: reducer1,
        currenciesReducer: currenciesReducer,
        currentCurrenciesValues: currentCurrenciesValues
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;