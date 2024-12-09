import { BookModelAllV2 } from "./book"
import { UserModelV2 } from "./user"

export type ReviewModelV2 = {
    id: number
    user_id: number
    book_id: number
    rating: number
    comment: string
    created_at: string

    users: UserModelV2
    books: BookModelAllV2
}