import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { tokenService } from './tokenService';

/**
 * Interceptor responsibilities:
 *  - attach access token to outgoing requests
 *  - on 401: attempt a single refresh flow (queue concurrent requests)
 *  - retry queued requests after refresh success
 *  - on refresh failure: clear tokens and redirect to login
 *
 * Assumptions:
 *  - refresh endpoint: POST /auth/refresh with { refreshToken } returning { accessToken, refreshToken? }
 *  - adapt endpoint URL/shape to your backend contract.
 */

type FailedRequest = {
  resolve: (value: Promise<AxiosResponse>) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

// Process queue (success -> retry with new token, error -> reject)
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      // We use axios.request to preserve original retry behaviour and transforms
      resolve(axios.request(config));
    }
  });

  failedQueue = [];
};

export function setupInterceptors(client: AxiosInstance) {
  // Request interceptor: attach access token
  client.interceptors.request.use(
    (config) => {
      const accessToken = tokenService.getAccessToken();
      if (accessToken && config.headers) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: handle 401 / refresh flow
  client.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
      const originalRequest = error.config;

      // If no config or already a retry, reject
      if (!originalRequest) return Promise.reject(error);

      const status = (error.response && error.response.status) || null;

      // If 401 -> attempt refresh
      if (status === 401 && !originalRequest._retry) {
        // mark as retry to prevent infinite loop
        originalRequest._retry = true;

        if (isRefreshing) {
          // queue the request until refresh finishes
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject, config: originalRequest });
          });
        }

        isRefreshing = true;

        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) {
          // nothing to do: clear tokens and redirect
          tokenService.clearTokens();
          isRefreshing = false;
          // optional: redirect to login page (client-side)
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(error);
        }

        // Create a bare axios instance to call refresh endpoint (avoids interceptor loops)
        const refreshClient = axios.create({
          baseURL: client.defaults.baseURL,
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        });

        return new Promise(async (resolve, reject) => {
          try {
            const resp = await refreshClient.post('/auth/refresh', { refreshToken });
            // adjust property names to match your backend
            const newAccessToken = resp.data?.accessToken;
            const newRefreshToken = resp.data?.refreshToken;

            if (!newAccessToken) {
              throw new Error('Refresh did not return new access token');
            }

            tokenService.setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });

            // update original request header and retry
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            }

            processQueue(null, newAccessToken);
            resolve(client.request(originalRequest));
          } catch (err) {
            processQueue(err, null);
            tokenService.clearTokens();
            // redirect to login
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            reject(err);
          } finally {
            isRefreshing = false;
          }
        });
      }

      return Promise.reject(error);
    }
  );

  return client;
}
