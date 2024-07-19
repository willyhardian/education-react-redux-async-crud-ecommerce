import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter-slice";
import productReducer from "./product-slice";
export default configureStore({
    reducer: {
        counter: counterReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
