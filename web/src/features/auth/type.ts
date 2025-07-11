

export type SignInRequest = z.infer<typeof SignInSchema>;


export type SignUpRequest = z.infer<typeof SignUpSchema>;


export type AuthResponse = {
    token: string,
}


export type AuthMeResponse = {
    name: string,
    email: string,
    created_at: string,
    updated_at: string,
}