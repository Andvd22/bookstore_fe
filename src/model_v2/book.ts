import { AuthorModelV2 } from "./author"
import { CategoryModelV2 } from "./category"
import { PublisherModelV2 } from "./publisher"

export type BookModelV2 = {
    id: number
    title: string
    price: number
    discount: number
    description: string
    image_url: string
    quantity: number
}

export type BookModelAllV2 = {
    id: number
    title: string
    author_id: number
    category_id: number
    publisher_id: number
    publication_date: string
    price: number
    discount: number
    description: string
    image_url: string
    quantity: number

    authors: AuthorModelV2
    categories: CategoryModelV2
    publishers: PublisherModelV2
    // order_items = relationship("OrderItem", back_populates="books")
    // reviews = relationship("Review", back_populates="books")
    // wish_list = relationship("WishList", back_populates="books")
}