import { configureStore } from '@reduxjs/toolkit'
import filterSlices from "./slices/filterSlices";


export const store = configureStore({
    reducer: {
        filterSlices,
    },
})