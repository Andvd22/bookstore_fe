import { ReviewModelV2 } from "@/model_v2/review"

export type ReviewResponse = {
    data: ReviewModelV2[]
    length: number
}