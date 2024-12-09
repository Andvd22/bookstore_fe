import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { CategoryModelV2 } from "@/model_v2/category";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getCategory: builder.query<CategoryModelV2[], null>({
            query: (payload) => ({
                ...endPoint.category.getAll(),
                data: payload,
            }),
        }),
    })
});

export const {
    useGetCategoryQuery
} = categoryApi;