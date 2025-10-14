import React from "react";
import PostData from "../data/PostData";
import PostCard from "./PostCard";
const PostListing = () => {
  return (
    <div className="w-full p-6 flex flex-col gap-8">
      post
      {PostData.map((post, index) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostListing;
