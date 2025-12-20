"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeletePost,
  useGetPosts,
  useSearchPosts,
} from "@/data/queries/services/posts/call-hooks";
import { usePostStore } from "@/data/stores";
import { useDebounce } from "@/hooks/useDebounce";
import { Eye, Pencil, Trash } from "lucide-react";
import { useState } from "react";

const PostList = () => {
  const [keywords, setKeywords] = useState("");
  const debouncedKeywords = useDebounce(keywords);

  const { posts, setPost, toggleEdit } = usePostStore();
  const { isLoading, error, isError } = useGetPosts();
  const {
    mutate,
    isPending: isLoadingDelete,
    error: errorDelete,
    isError: isErrorDelete,
  } = useDeletePost();

  const {
    isLoading: isLoadingSearch,
    error: errorSearch,
    isError: isErrorSearch,
  } = useSearchPosts(debouncedKeywords);

  return (
    <div className="w-full flex flex-col items-center gap-3 p-3 border rounded-lg">
      <h1 className="text2xl font-bold">Listed Posts</h1>
      {isError && (
        <div className="w-full px-4 py-2 bg-red-100 text-red-500 font-semibold border border-red-500 rounded-lg text-center">
          {error.message}
        </div>
      )}

      {isErrorSearch && (
        <div className="w-full px-4 py-2 bg-red-100 text-red-500 font-semibold border border-red-500 rounded-lg text-center">
          {errorSearch.message}
        </div>
      )}

      {isErrorDelete && (
        <div className="w-full px-4 py-2 bg-red-100 text-red-500 font-semibold border border-red-500 rounded-lg text-center">
          {errorDelete.message}
        </div>
      )}

      {(isLoading || isLoadingSearch || isLoadingDelete) && (
        <div className="w-full px-4 py-2 bg-blue-100 text-blue-500 font-semibold border border-blue-500 rounded-lg text-center">
          Loading...
        </div>
      )}

      <Input
        type="search"
        className="mb-5 h-10"
        placeholder="Search post by title"
        value={keywords}
        onBlur={() => setKeywords("")}
        onChange={(e) => setKeywords(e.target.value)}
        disabled={isLoading}
      />

      <ul className="w-full flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
        {posts.length > 0 ? (
          posts?.map((post) => (
            <li
              key={post.id}
              className="font-semibold text-lg px-4 py-2 border rounded-lg cursor-pointer hover:shadow flex items-center justify-between gap-3"
            >
              <h1>{post.title}</h1>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  title="Edit Post"
                  onClick={() => setPost(post)}
                >
                  <Eye />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  title="Edit Post"
                  onClick={() => toggleEdit(post)}
                >
                  <Pencil />
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  title="Delete Post"
                  onClick={() => mutate(post.id)}
                >
                  <Trash />
                </Button>
              </div>
            </li>
          ))
        ) : (
          <li className="font-semibold text-lg">No posts</li>
        )}
      </ul>
    </div>
  );
};

export default PostList;
