import { UserModelV2 } from "@/model_v2/user"

export type AuthResponse = {
    access_token: string
    user: UserModelV2
}

export type RegisterResponse = string

export type SendFileAuthResponse = {
    data: string
}