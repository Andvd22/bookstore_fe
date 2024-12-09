import { BookModelAllV2 } from "./book"

export type OrderItemModelV2 = {
    id: number
    book_id: number
    order_id: number
    price: number
    quantity: number

    books: BookModelAllV2
}