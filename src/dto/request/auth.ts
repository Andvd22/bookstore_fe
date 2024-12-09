export type LoginRequest = {
    username: string
    password: string
}

export type RegisterRequest = {
    username: string
    password: string
    email: string
    first_name: string
    last_name: string
    phone_number: string
    address: string
}

export type SendFileAuthRequest = {
    data: string
    profileId: number
    uuid: string
}

export type FaceLoginRequest = {
    data: string
}

export type SaveProcessRequest = {
    profileId: number
}

export type UpdateUserRequest = {
    username: string
    password: string
    address: string
    phone_number: string
}