import { configureStore } from "@reduxjs/toolkit";

import apiReducer from './slices/apiReducer'
import cart from './slices/cart'


const reducer = {
    api: apiReducer,
    cart:cart
}

const store = configureStore({
    reducer:reducer
})

export default store
