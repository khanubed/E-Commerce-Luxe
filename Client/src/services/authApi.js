import API from "../api/axios";

export const loginApi = async (credentials) => {
  const response = await API.post("/api/auth/login", credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await API.post("/api/auth/register", userData);
  return response.data;
};

export const logoutApi = async () => {
  const response = await API.post("/api/auth/logout");
  return response.data;
};