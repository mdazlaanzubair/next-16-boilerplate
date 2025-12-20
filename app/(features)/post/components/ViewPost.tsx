"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetPosts } from "@/data/queries/services/posts/call-hooks";
import { usePostStore } from "@/data/stores";
import { Eye, Pencil, ThumbsDown, ThumbsUp, Trash } from "lucide-react";

const ViewPost = () => {
  const { post } = usePostStore();
  const { isLoading, error, isError } = useGetPosts();

  return (
    <div className="w-full flex flex-col items-center gap-3 p-5 border rounded-lg">
      <h1 className="text2xl font-bold">Selected Posts</h1>

      <ul className="w-full flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
        {post ? (
          <li className="font-semibold text-lg px-4 py-2 flex flex-col gap-3">
            <h1>{post.title}</h1>
            <p className="text-sm mb-3">{post.body}</p>

            <div className="w-full flex flex-wrap items-center gap-3 mb-5">
              <h2 className="text-xs font-semibold">Tags:</h2>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              {post.reactions.likes > 0 && (
                <Badge variant="default">
                  <ThumbsUp />
                  {post.reactions.likes}
                </Badge>
              )}

              {post.reactions.dislikes > 0 && (
                <Badge variant="secondary">
                  <ThumbsDown />
                  {post.reactions.dislikes}
                </Badge>
              )}

              {post.views > 0 && (
                <Badge variant="ghost">
                  <Eye />
                  {post.views}
                </Badge>
              )}
            </div>
          </li>
        ) : (
          <li className="font-semibold text-lg">No post is selected</li>
        )}
      </ul>
    </div>
  );
};

export default ViewPost;
