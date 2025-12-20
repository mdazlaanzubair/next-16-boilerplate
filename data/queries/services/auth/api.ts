import axiosClient from "@/data/axios/client.config";
import type { LoginRequest, LoginResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

export const authApi = {
  login(payload: LoginRequest) {
    return axiosClient.post<LoginResponse>(`${BASE_URL}/auth/login`, payload);
  },

  getUser() {
    return axiosClient.get<any>(`${BASE_URL}/auth/me`);
  },

  getRefreshToken(refreshToken: string) {
    return axiosClient.post<any>(`${BASE_URL}/auth/refresh`, {
      refreshToken,
    });
  },
};
