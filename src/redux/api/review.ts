import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { ReviewResponse } from "@/dto/response/review";
import { ReviewRequest } from "@/dto/request/review";

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getReview: builder.query<ReviewResponse, number>({
            query: (payload) => ({
                ...endPoint.review.getReview(),
                params: {
                    book_id: payload,
                }
            }),
        }),
        createReview: builder.mutation<ReviewResponse, ReviewRequest>({
            query: (payload) => ({
                ...endPoint.review.createReview(),
                data: payload
            }),
        }),
        deleteReview: builder.mutation<ReviewResponse, number>({
            query: (payload) => ({
                ...endPoint.review.delete(),
                params: {
                    id: payload
                }
            }),
        }),
    })
});

export const {
    useGetReviewQuery,
    useCreateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;