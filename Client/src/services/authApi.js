import axios from "axios";
import API from "../api/axios";
import { Import } from "lucide-react";

export const loginApi = async (credentials) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/login`, credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await  axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/register`,userData);
  return response.data;
};

export const logoutApi = async () => {
  const response = await API.post("/api/auth/logout");
  return response.data;
};