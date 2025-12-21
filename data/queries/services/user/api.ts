import axiosClient from "@/data/axios/client.config";
import { UserFullInterface } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

export const authApi = {
  getUser() {
    return axiosClient.get<UserFullInterface>(`${BASE_URL}/auth/me`);
  },
};
