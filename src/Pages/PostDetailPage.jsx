import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import PostCard from "../Components/PostCard";
import { FaArrowLeft } from "react-icons/fa";
const PostDetailPage = () => {
  const { posts } = useContext(AppContext);
  const { slug } = useParams();

  // Find the post by slug
  const selectedPost = posts.find((p) => p.slug === slug);

  const navigator = useNavigate();

  if (!selectedPost) return <div>Post not found!</div>;

  return (
    <div className="p-4">
      <button
        className="flex items-center gap-1 text-blue-500 mb-5 border-b p-1"
        onClick={() => navigator(-1)}
      >
        <FaArrowLeft />
        GoBack
      </button>
      <PostCard post={selectedPost} showComment={true} />
    </div>
  );
};

export default PostDetailPage;
