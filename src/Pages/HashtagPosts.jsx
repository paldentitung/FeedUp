import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { FaArrowLeft } from "react-icons/fa";
const HashtagPosts = () => {
  const { posts } = useContext(AppContext);
  const { hashTag } = useParams();
  console.log("hash_tag from URL:", hashTag);
  const filteredPosts = posts.filter((post) =>
    post.hashtags.includes(`#${hashTag}`)
  );
  const navigator = useNavigate();

  return (
    <div>
      <div className="flex items-center p-4">
        <button
          onClick={() => navigator(-1)}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-200 "
        >
          <FaArrowLeft />
          Go Back
        </button>
        <h2 className="text-center  font-bold hover:underline mx-auto">
          #{hashTag}
        </h2>
      </div>
      <div className="flex flex-col space-y-4 p-4 gap-4">
        {filteredPosts.length === 0 ? (
          <p>No posts found for this hashtag.</p>
        ) : (
          filteredPosts.map((post) => <PostCard post={post} />)
        )}
      </div>
    </div>
  );
};

export default HashtagPosts;
