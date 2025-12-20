import axiosClient from "@/data/axios/client.config";
import { PostInterface } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

export const postApi = {
  list() {
    return axiosClient.get<{ posts: PostInterface[] }>(`${BASE_URL}/posts`);
  },

  getById(id: number) {
    return axiosClient.get<PostInterface>(`${BASE_URL}}/posts/${id}`);
  },

  search(query: string) {
    return axiosClient.get<{ posts: PostInterface[] }>(
      `${BASE_URL}/posts/search?q=${query}`
    );
  },

  add(payload: PostInterface) {
    return axiosClient.post<PostInterface>(`${BASE_URL}/posts/add`, payload);
  },

  update(id: number, payload: PostInterface) {
    return axiosClient.put<PostInterface>(`${BASE_URL}/posts/${id}`, payload);
  },

  delete(id: number) {
    return axiosClient.delete<PostInterface>(`${BASE_URL}/posts/${id}`);
  },
};
