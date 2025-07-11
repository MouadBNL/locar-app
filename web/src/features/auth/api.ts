import { http, type ApiResponse } from "@/lib/http";
import type { AuthMeResponse, AuthResponse, SignInRequest, SignUpRequest } from ".";

export const singinFn = async (request: SignInRequest) => {
    return await http.post<ApiResponse<AuthResponse>>('/auth/signin', request).then(res => {
        localStorage.setItem("token", res.data.data.token);
    });
}

export const signupFn = async (request: SignUpRequest) => {
    return await http.post<ApiResponse<AuthResponse>>('/auth/signup', request).then(res => {
        localStorage.setItem("token", res.data.data.token);
    });
}

export const signoutFn = async () => {
    const res = await http.delete<ApiResponse>('/auth/signout').finally(() => {
        localStorage.removeItem("token");
    });

    return res;
}

export const authMeFn = async () => {
    const res = await http.get<ApiResponse<AuthMeResponse>>('/auth/me');

    return res.data.data;
}