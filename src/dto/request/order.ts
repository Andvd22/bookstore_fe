export type CreateOrderReq = {
    items: CreateOrderItem[]
}

export type CreateOrderItem = {
    book_id: number
    quantity: number
}