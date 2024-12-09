import { endPoint } from "../query/endpoint";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { CreateOrderReq } from "@/dto/request/order";
import { OrderModelV2 } from "@/model_v2/order";
import { OrderItemModelV2 } from "@/model_v2/order_item";



export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        createOrder: builder.mutation<any, CreateOrderReq>({
            query: (payload) => ({
                ...endPoint.order.createOrder(),
                data: payload,
            }),
        }),
        getAllOrder: builder.query<OrderModelV2[], null>({
            query: () => ({
                ...endPoint.order.getAllOrder(),
            }),
        }),
        getOrderByUserId: builder.query<OrderModelV2[], null>({
            query: () => ({
                ...endPoint.order.getOrderByUserId(),
            }),
        }),
        getOrderItems: builder.query<OrderItemModelV2[], number>({
            query: (payload) => ({
                ...endPoint.order.getOrderItems(),
                params: {
                    order_id: payload,
                }
            }),
        }),
        updateStatusOrder: builder.mutation<any, { status: string, order_id: number }>({
            query: (payload) => ({
                ...endPoint.order.updateOrder(),
                params: {
                    status: payload.status,
                    order_id: payload.order_id,
                },
            }),
        }),
        deleteOrder: builder.mutation<any, number>({
            query: (payload) => ({
                ...endPoint.order.deleteOrder(),
                params: {
                    order_id: payload,
                },
            }),
        }),
    })
});

export const {
    useGetAllOrderQuery,
    useGetOrderByUserIdQuery,
    useGetOrderItemsQuery,
    useCreateOrderMutation,
    useUpdateStatusOrderMutation,
    useDeleteOrderMutation,
} = orderApi;