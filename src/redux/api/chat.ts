import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";



export const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        chatbot: builder.mutation<any, string>({
            query: (payload) => ({
                ...endPoint.chat.chatBot(),
                params: {
                    message: payload,
                },
            }),
        }),
    })
});

export const {
    useChatbotMutation,
} = chatApi;