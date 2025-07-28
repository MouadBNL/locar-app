import type { AuthMeResponse, AuthResponse, SignInRequest, SignUpRequest } from '.';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function singinFn(request: SignInRequest) {
  return await http.post<ApiResponse<AuthResponse>>('/auth/signin', request).then((res) => {
    localStorage.setItem('token', res.data.data.token);
  });
}

export async function signupFn(request: SignUpRequest) {
  return await http.post<ApiResponse<AuthResponse>>('/auth/signup', request).then((res) => {
    localStorage.setItem('token', res.data.data.token);
  });
}

export async function signoutFn() {
  const res = await http.delete<ApiResponse>('/auth/signout').finally(() => {
    localStorage.removeItem('token');
  });

  return res;
}

export async function authMeFn() {
  const res = await http.get<ApiResponse<AuthMeResponse>>('/auth/me');

  return res.data.data;
}
