"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreatePost,
  useUpdatePost,
} from "@/data/queries/services/posts/call-hooks";
import { usePostStore } from "@/data/stores";
import { useEffect, useState } from "react";

const PostForm = () => {
  const { posts, post: editPost, isEdit, toggleEdit } = usePostStore();

  const {
    mutate: createPostMutation,
    isPending: isLoading,
    error,
    isError,
    isSuccess,
  } = useCreatePost();

  const {
    mutate: updatePostMutation,
    isPending: isLoadingUpdate,
    error: errorUpdate,
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdatePost();

  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    console.log(editPost);
    if (isEdit && editPost) {
      setPost(editPost);
    }
  }, [isEdit, editPost]);

  useEffect(() => {
    (isSuccess || isSuccessUpdate) && setPost({ title: "", body: "" });
  }, [isSuccess, isSuccessUpdate]);

  const handleSubmit = () => {
    if (isLoading || !post.title || !post.body) return;

    const payload = {
      tags: ["history", "american", "crime"],
      reactions: {
        likes: 192,
        dislikes: 25,
      },
      views: 305,
      userId: 121,

      id: isEdit && editPost ? editPost.id : posts.length + 1,
      ...post,
    };

    if (isEdit && editPost) {
      updatePostMutation({ id: payload.id, payload });
    } else {
      createPostMutation(payload);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 p-3 border rounded-lg">
      <h1 className="text2xl font-bold">
        {isEdit ? "Edit Post" : "Create Post"}
      </h1>

      {isError && (
        <div className="w-full px-4 py-2 bg-red-100 text-red-500 font-semibold rounded-lg text-center">
          {error.message}
        </div>
      )}

      {isErrorUpdate && (
        <div className="w-full px-4 py-2 bg-red-100 text-red-500 font-semibold rounded-lg text-center">
          {errorUpdate.message}
        </div>
      )}

      {(isSuccess || isSuccessUpdate) && (
        <div className="w-full px-4 py-2 bg-green-100 text-green-500 font-semibold rounded-lg text-center">
          Post {isSuccess && "created "}
          {isSuccessUpdate && "updated "} successfully
        </div>
      )}

      <Input
        type="text"
        placeholder="Post Title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        disabled={isLoading || isLoadingUpdate}
      />
      <Textarea
        placeholder="Type your message here."
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        disabled={isLoading || isLoadingUpdate}
      />
      <div className="w-full flex items-center gap-3">
        <Button
          type="button"
          variant="default"
          size="lg"
          className="grow"
          onClick={() => handleSubmit()}
          disabled={isLoading || isLoadingUpdate}
        >
          {isEdit ? "Update Post" : "Create Post"}
        </Button>
        {isEdit && (
          <Button
            type="button"
            variant="destructive"
            size="lg"
            onClick={() => {
              toggleEdit(null);
              setPost({ title: "", body: "" });
            }}
            disabled={isLoading || isLoadingUpdate}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostForm;
