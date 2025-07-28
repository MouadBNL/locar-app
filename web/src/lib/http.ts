import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8000/api',
});

http.defaults.withCredentials = true;
http.defaults.withXSRFToken = true;

http.interceptors.request.use(
  (config) => {
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

export { http };

export interface ApiResponse<T = unknown> {
  data: T;
  message: string | null;
}
