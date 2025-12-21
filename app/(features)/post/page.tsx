import { PostList, PostForm, ViewPost } from "./components";

const PostPage = () => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex flex-col gap-3">
          <PostForm />
          <ViewPost />
        </div>
        <div className="col-span-1 md:col-span-2">
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
