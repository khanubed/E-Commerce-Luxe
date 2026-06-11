import axios from 'axios';
import { setCredentials, logoutUser } from '../features/auth/authSlice.js'

let store;
export const injectStore = (_store) => {
  store = _store;
};

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token  = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE Interceptor: Handle 401 and Refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken, user } = response.data;
        console.log(accessToken,user)
        store.dispatch(setCredentials({ accessToken, user }));

        console.log("user from axios: ", user)
        console.log("access token from axios: ", accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        store.dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }
    console.error("API request failed:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;