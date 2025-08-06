import type { AuthMeResponse, AuthResponse, SignInRequest, SignUpRequest } from '.';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';
import { queryClient } from '@/lib/query-generator';

export async function singinFn(request: SignInRequest) {
  return await http.post<ApiResponse<AuthResponse>>('/auth/signin', request).then((res) => {
    localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('tenant', res.data.data.tenant_id);
  });
}

export async function signupFn(request: SignUpRequest) {
  return await http.post<ApiResponse<AuthResponse>>('/auth/signup', request).then((res) => {
    localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('tenant', res.data.data.tenant_id);
  });
}

export async function signoutFn() {
  const res = await http.delete<ApiResponse>('/auth/signout').finally(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('tenant');
    queryClient.invalidateQueries();
  });

  return res;
}

export async function authMeFn() {
  const res = await http.get<ApiResponse<AuthMeResponse>>('/auth/me');
  localStorage.setItem('tenant', res.data.data.tenant_id);
  return res.data.data;
}
