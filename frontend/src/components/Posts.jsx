import { POSTS } from "../utils/db/dummy";
import { Post } from "./Post";
import { PostSekeleton } from "./skeletons/PostSekeleton";

export const Posts = () => {
  const isLoading = false;
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center flex-col">
          <PostSekeleton />
          <PostSekeleton />
          <PostSekeleton />
        </div>
      )}
      {!isLoading && POSTS?.length === 0 && (
        <p className="text-center my-4">No posts in this tab.</p>
      )}
      {!isLoading && POSTS && (
        <div>
          {POSTS.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
