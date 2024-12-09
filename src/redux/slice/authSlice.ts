import Cookies from "js-cookie";

import { createSlice } from "@reduxjs/toolkit";
import { LOCAL, TOKEN_TYPE } from "@/model/variable";
import { authApi } from "../api/auth";
import { UserModelV2 } from "@/model_v2/user";

interface AuthState {
    profile?: UserModelV2
    role: string
}

const initialState: AuthState = {
    role: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reload: (state) => {
            state.role = localStorage.getItem(LOCAL.ROLE) as ("admin" | "user" | "") || "";
            state.profile = JSON.parse(localStorage.getItem(LOCAL.USER) || "{}") as UserModelV2;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.profile = payload?.user || {};
            state.role = payload.user.role_name;
            
            localStorage.setItem(LOCAL.USER, JSON.stringify(state.profile));
            localStorage.setItem(LOCAL.ROLE, payload.user.role_name);


            if (payload?.access_token) {
                Cookies.set(TOKEN_TYPE.ACCESS_TOKEN, payload.access_token, { expires: 1 / (24) });
            }
        }),

            builder.addMatcher(authApi.endpoints.login.matchRejected, (state, _) => {
                state.profile = undefined;
                Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
            })
    }
})

export const { reload } = authSlice.actions;
export default authSlice;