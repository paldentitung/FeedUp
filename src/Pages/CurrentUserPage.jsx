import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import PostCard from "../Components/PostCard";
import Button from "../Components/Button";
const CurrentUserPage = () => {
  const { username } = useParams();
  const { currentUser, posts } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("posts");

  // Optional: check if the URL username matches the logged-in user
  if (!currentUser || currentUser.username !== username) {
    return <div>User not found or not logged in</div>;
  }

  const currentUserPosts = posts.filter((post) => post.username === username);

  if (!currentUserPosts) {
    return <p>not Found</p>;
  }
  return (
    <section className="flex flex-col   w-full p-4 space-y-5 ">
      <div className="flex flex-col  bg-white p-4 rounded-sm shadow-sm">
        <div className="flex items-center justify-between flex-col md:flex-row gap-4 ">
          <div className="flex gap-2 items-center text-center md:text-start flex-col md:flex-row">
            <img
              src={currentUser.avatar || "/user.png"}
              alt={currentUser.username}
              className="w-24 h-24 rounded-full mb-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">{currentUser.fullname}</h2>
              <p className="text-lg text-gray-600">@{currentUser.username}</p>
              <p className="mt-2 text-gray-500">{currentUser.status}</p>
            </div>
          </div>
          <div>
            <Button name="Edit Profile" />
          </div>
        </div>
        <p className="mt-2 text-gray-700  max-w-md font-bold">
          {currentUser.bio}
        </p>
      </div>
      <div className="">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 text-sm md:text-base font-medium transition-colors duration-200 ${
              activeTab === "posts"
                ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-selected={activeTab === "posts"}
            role="tab"
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("About")}
            className={`px-4 py-2 text-sm md:text-base font-medium transition-colors duration-200 ${
              activeTab === "About"
                ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-selected={activeTab === "About"}
            role="tab"
          >
            About
          </button>
        </div>

        {activeTab === "posts" && (
          <div className="flex flex-col gap-6 mt-4 w-full">
            {currentUserPosts.length > 0 ? (
              currentUserPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">No posts yet.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Encourage {username} to share their moments!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "About" && (
          <div className="mt-4 p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              About {username}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {currentUser?.bio || "No bio available yet."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CurrentUserPage;
