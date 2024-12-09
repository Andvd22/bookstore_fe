import authSlice from "./slice/authSlice";

import { combineReducers } from "@reduxjs/toolkit";
import { queryApi } from "./api/query";
import { authApi } from "./api/auth";
import { categoryApi } from "./api/category";
import { bookApi } from "./api/book";
import { reviewApi } from "./api/review";
import { orderApi } from "./api/order";
import { chatApi } from "./api/chat";



export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    authSlice: authSlice.reducer,
})