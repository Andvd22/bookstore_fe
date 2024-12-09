import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { AuthResponse, RegisterResponse } from "@/dto/response/auth";
import { LoginRequest, RegisterRequest, UpdateUserRequest } from "@/dto/request/auth";
import { UserModelV2 } from "@/model_v2/user";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (payload) => ({
                ...endPoint.auth.login(),
                data: payload,
            }),
        }),
        getUserById: builder.query<UserModelV2, number>({
            query: (payload) => ({
                ...endPoint.auth.getUserById(),
                params: {
                    id: payload
                }
            }),
        }),
        register: builder.mutation<QueryReturnType<RegisterResponse>, RegisterRequest>({
            query: (payload) => ({
                ...endPoint.auth.register(),
                data: payload,
            }),
        }),
        updateUser: builder.mutation<any, UpdateUserRequest>({
            query: (payload) => ({
                ...endPoint.auth.updateUser(),
                data: payload,
            }),
        }),
        deleteUser: builder.mutation<any, null>({
            query: () => ({
                ...endPoint.auth.deleteUser(),  
                method: 'DELETE',
            }),
        }),
    })
});

export const {
    useGetUserByIdQuery,
    useLoginMutation,
    useRegisterMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = authApi;