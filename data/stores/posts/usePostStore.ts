import { PostInterface } from "@/types";
import { create } from "zustand";

// Interface of state of this store
interface PostStateInterface {
  post: PostInterface | null; // Post that is action | edit mode | selected
  posts: PostInterface[]; // All posts
  isEdit: boolean;

  addPost: (post: PostInterface) => void;
  setPost: (post: PostInterface) => void;
  toggleEdit: (post: PostInterface | null) => void;
  setPosts: (posts: PostInterface[]) => void;
  updatePost: (id: number, post: PostInterface) => void;
  deletePost: (id: number) => void;
}

export const usePostStore = create<PostStateInterface>()((set, get) => ({
  // Initial states
  post: null,
  posts: [],
  isEdit: false,

  // Actions
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  setPost: (post) => set({ post }),
  setPosts: (posts) => set({ posts }),
  toggleEdit: (post) =>
    set({
      isEdit: post?.id ? true : false,
      post,
    }),
  updatePost: (id, post) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === id ? post : p)),
      post: null, // resetting states back to default
      isEdit: false, // resetting states back to default
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
      post: null, // resetting states back to default
      isEdit: false, // resetting states back to default
    })),
}));
