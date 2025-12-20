// data/axios/client.config.ts
import axios from 'axios';
import { setupInterceptors } from './client.interceptor';

// Base axios client used across app.
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const axiosClient = axios.create({
  baseURL,
  // withCredentials: true, // if backend uses cookies; adjust if not required
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Apply interceptors
setupInterceptors(axiosClient);

export default axiosClient;
