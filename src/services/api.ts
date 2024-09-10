import axios from 'axios';
import { useDashboardStore } from '../store/DashboardStore';

const { sessionData } = useDashboardStore.getState();


const API_BASE_URL = sessionData.apiURL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;