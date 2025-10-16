import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import PostCard from "../Components/PostCard";
const PostDetailPage = () => {
  const { posts } = useContext(AppContext);
  const { slug } = useParams();

  // Find the post by slug
  const selectedPost = posts.find((p) => p.slug === slug);

  if (!selectedPost) return <div>Post not found!</div>;

  return (
    <div className="p-4">
      <PostCard post={selectedPost} />
    </div>
  );
};

export default PostDetailPage;
