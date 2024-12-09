import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { queryApi } from "./api/query";
import { authApi } from "./api/auth";
import { categoryApi } from "./api/category";
import { bookApi } from "./api/book";
import { reviewApi } from "./api/review";
import { orderApi } from "./api/order";
import { chatApi } from "./api/chat";



const middleware = [
    authApi.middleware,
    queryApi.middleware,
    categoryApi.middleware,
    bookApi.middleware,
    reviewApi.middleware,
    orderApi.middleware,
    chatApi.middleware,
]

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch