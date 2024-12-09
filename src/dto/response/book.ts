import { BookModelV2 } from "@/model_v2/book"

export type BookResponse = {
    length: number,
    books: BookModelV2[]
}