import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const api = axios.create({
  baseURL: cookie.get("apiURL"),
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
