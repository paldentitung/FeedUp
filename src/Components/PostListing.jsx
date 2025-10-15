import React, { useContext } from "react";
import PostCard from "./PostCard";
import { AppContext } from "../Context/AppContext";

const PostListing = () => {
  const { posts } = useContext(AppContext);
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostListing;
