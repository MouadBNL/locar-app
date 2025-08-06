import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.defaults.withCredentials = true;
http.defaults.withXSRFToken = true;

http.interceptors.request.use(
  (config) => {
    const tenant = localStorage.getItem('tenant');
    if (tenant) {
      config.headers['X-Tenant'] = tenant;
    }
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.message === 'Access denied.') {
      localStorage.removeItem('token');
      localStorage.removeItem('tenant');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export { http };

export interface ApiResponse<T = unknown> {
  data: T;
  message: string | null;
}
