import { http } from "@/lib/http";
import { makeMutationHook, makeQueryHook } from "@/lib/query-generator";
import z from "zod";
import type { ApiResponse } from ".";

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type AuthResponse = {
    token: string,
}

export type SignInRequest = z.infer<typeof SignInSchema>;

export const singinFn = async (request: SignInRequest) => {
    return await http.post<ApiResponse<AuthResponse>>('/auth/signin', request).then(res => {
        localStorage.setItem("token", res.data.data.token);
    });
}

export const useSingIn = makeMutationHook(singinFn);


export const SignUpSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

export type SignUpRequest = z.infer<typeof SignUpSchema>;

export const signupFn = async (request: SignUpRequest) => {
    return await http.post<ApiResponse<AuthResponse>>('/auth/signup', request).then(res => {
        localStorage.setItem("token", res.data.data.token);
    });
}

export const useSignUp = makeMutationHook(signupFn);




export const signoutFn = async () => {
    const res = await http.delete<ApiResponse>('/auth/signout').finally(() => {
        localStorage.removeItem("token");
    });

    return res;
}


export const useSignout = makeMutationHook(signoutFn)


export type AuthMeResponse = {
    name: string,
    email: string,
    created_at: string,
    updated_at: string,
}


export const useAuthMe = makeQueryHook(['auth.me'], async () => {
    console.log("Sending auth me request");
    const res = await http.get<ApiResponse<AuthMeResponse>>('/auth/me');

    return res.data.data;
})
