import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import PostCard from "../Components/PostCard";
import Button from "../Components/Button";

const CurrentUserPage = () => {
  const { username } = useParams();
  const { currentUser, posts, theme } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("posts");

  // Optional: check if the URL username matches the logged-in user
  if (!currentUser || currentUser.username !== username) {
    return (
      <div
        className={`text-center text-lg py-10 ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        User not found or not logged in
      </div>
    );
  }

  const currentUserPosts = posts.filter((post) => post.username === username);

  if (!currentUserPosts) {
    return (
      <p
        className={`text-center text-lg py-10 ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        No posts found
      </p>
    );
  }

  return (
    <section
      className={`flex flex-col w-full p-4 space-y-5 min-h-screen transition-colors duration-300 ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div
        className={`flex flex-col p-4 rounded-lg shadow-md ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div className="flex items-center justify-between flex-col md:flex-row gap-4">
          <div className="flex gap-4 items-center text-center md:text-start flex-col md:flex-row">
            <img
              src={currentUser.avatar || "/user.png"}
              alt={`${currentUser.username}'s avatar`}
              className={`w-24 h-24 rounded-full object-cover border-2 transition-all duration-200 ${
                theme === "light"
                  ? "border-gray-300 hover:ring-blue-300 hover:ring-2"
                  : "border-gray-600 hover:ring-blue-400 hover:ring-2"
              } mb-4 md:mb-0`}
            />
            <div>
              <h2
                className={`text-2xl font-semibold ${
                  theme === "light" ? "text-gray-900" : "text-gray-100"
                }`}
              >
                {currentUser.fullname}
              </h2>
              <p
                className={`text-lg ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                @{currentUser.username}
              </p>
              <p
                className={`mt-2 ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {currentUser.status}
              </p>
            </div>
          </div>
          <div>
            <Button
              name="Edit Profile"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                theme === "light"
                  ? "bg-blue-500 text-white hover:bg-blue-600 hover:ring-1 hover:ring-blue-500 hover:ring-offset-white"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:ring-1 hover:ring-blue-400 hover:ring-offset-gray-800"
              }`}
              aria-label="Edit profile"
            />
          </div>
        </div>
        <p
          className={`mt-4 text-center md:text-start max-w-md font-bold ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          {currentUser.bio || "No bio available yet."}
        </p>
      </div>
      <div>
        <div
          className={`flex gap-4 border-b ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 text-sm md:text-base font-medium transition-colors duration-200 ${
              activeTab === "posts"
                ? theme === "light"
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-blue-400 border-b-2 border-blue-400 font-semibold"
                : theme === "light"
                ? "text-gray-500 hover:text-gray-700"
                : "text-gray-400 hover:text-gray-200"
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
                ? theme === "light"
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-blue-400 border-b-2 border-blue-400 font-semibold"
                : theme === "light"
                ? "text-gray-500 hover:text-gray-700"
                : "text-gray-400 hover:text-gray-200"
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
              <div
                className={`text-center py-10 rounded-lg ${
                  theme === "light" ? "bg-gray-50" : "bg-gray-700"
                }`}
              >
                <p
                  className={`text-lg ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  No posts yet.
                </p>
                <p
                  className={`text-sm mt-2 ${
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Share your moments!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "About" && (
          <div
            className={`mt-4 p-5 rounded-lg shadow-md ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h2
              className={`text-xl font-bold mb-5 ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              About {username || "User"}
            </h2>
            <div className="flex flex-col gap-5">
              <div
                className={`pb-3 border-b ${
                  theme === "light" ? "border-gray-200" : "border-gray-600"
                }`}
              >
                <span
                  className={`text-sm font-medium block ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Full Name
                </span>
                <p
                  className={`text-lg font-semibold mt-1 ${
                    theme === "light" ? "text-gray-800" : "text-gray-200"
                  }`}
                >
                  {currentUser?.fullname || "Not provided"}
                </p>
              </div>
              <div
                className={`pb-3 border-b ${
                  theme === "light" ? "border-gray-200" : "border-gray-600"
                }`}
              >
                <span
                  className={`text-sm font-medium block ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Username
                </span>
                <p
                  className={`text-base mt-1 ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  @{currentUser?.username || "Not provided"}
                </p>
              </div>
              <div
                className={`pb-3 border-b ${
                  theme === "light" ? "border-gray-200" : "border-gray-600"
                }`}
              >
                <span
                  className={`text-sm font-medium block ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Status
                </span>
                <p
                  className={`text-base mt-1 ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {currentUser?.status || "No status"}
                </p>
              </div>
              <div>
                <span
                  className={`text-sm font-medium block ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Bio
                </span>
                <p
                  className={`text-sm mt-1 ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {currentUser?.bio || "No bio available yet."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CurrentUserPage;
