import React from "react";
import postData from "../data/PostData";
import PostCard from "./PostCard";

const PostListing = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {postData.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostListing;
