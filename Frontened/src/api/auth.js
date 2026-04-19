import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// Interceptor to tag access token with each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to get access token using refresh token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const signupUser = (formData) => API.post('auth/register', formData);
export const loginUser = (formData) => API.post('auth/login', formData);

export default API;
