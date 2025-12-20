import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { postApi } from "./api";
import { usePostStore } from "@/data/stores";
import { PostInterface } from "@/types";

// Get all posts list
export function useGetPosts() {
  // Getting the store setter
  const setPosts = usePostStore((s) => s.setPosts);

  // Making API call using react-query hook
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: postApi.list,
    retry: false,
  });

  // Performing side-effect to set the value in the store
  // NOTE: Using useEffect cause useQuery v5 don't support onSuccess
  useEffect(() => {
    if (query.data) {
      const data = query.data.data; // axios response

      // Setting user info in the store
      setPosts(data.posts);
    }
  }, [query.data, setPosts]);

  return query;
}

// Get post by id
export function useGetPostById(id: number) {
  // Getting the store setter
  const setPost = usePostStore((s) => s.setPost);

  // Making API call using react-query hook
  const query = useQuery({
    queryKey: ["posts", id],
    queryFn: () => postApi.getById(id),
    retry: false,
  });

  // Performing side-effect to set the value in the store
  // NOTE: Using useEffect cause useQuery v5 don't support onSuccess
  useEffect(() => {
    if (query.data) {
      const data = query.data.data; // axios response

      // Setting user info in the store
      setPost(data);
    }
  }, [query.data, setPost]);

  return query;
}

// Search posts
export function useSearchPosts(keywords: string) {
  // Getting the store setter
  const setPosts = usePostStore((s) => s.setPosts);

  // Making API call using react-query hook
  const query = useQuery({
    queryKey: ["posts", keywords],
    queryFn: () => postApi.search(keywords),
    retry: false,
    enabled: keywords.trim().length > 0,
  });

  // Performing side-effect to set the value in the store
  // NOTE: Using useEffect cause useQuery v5 don't support onSuccess
  useEffect(() => {
    if (query.data) {
      const data = query.data.data; // axios response

      // Setting user info in the store
      setPosts(data.posts);
    }
  }, [query.data, setPosts]);

  return query;
}

// Add post
export function useCreatePost() {
  // Getting the store setter
  const addPost = usePostStore((s) => s.addPost);

  // Making API call using react-query hook
  return useMutation({
    mutationFn: postApi.add,
    onSuccess: (res) => {
      // Setting user info in the store
      addPost(res.data);
    },
  });
}

// Update post
export function useUpdatePost() {
  // Getting the store setter
  const updatePost = usePostStore((s) => s.updatePost);

  // Making API call using react-query hook
  return useMutation<any, Error, { id: number; payload: PostInterface }>({
    mutationFn: ({ id, payload }) => postApi.update(id, payload),
    onSuccess: (res, { id }) => {
      updatePost(id, res.data);
    },
  });
}

// Delete post
export function useDeletePost() {
  // Getting the store setter
  const deletePost = usePostStore((s) => s.deletePost);

  // Making API call using react-query hook
  return useMutation({
    mutationFn: postApi.delete,
    onSuccess: (_, id) => {
      deletePost(id);
    },
  });
}
