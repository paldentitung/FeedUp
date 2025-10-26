import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import UsersData from "../data/UsersData";
import PostCard from "../Components/PostCard";
import { FaArrowLeft } from "react-icons/fa";

const UserProfilePage = () => {
  const { posts, friend, toggleFriends, theme } = useContext(AppContext);
  const { username } = useParams();
  const navigate = useNavigate();

  const selectedUser = posts.find((user) => user.username === username);
  const userInfo = UsersData.find(
    (user) => user.name === selectedUser?.username
  );
  const userPost = posts.filter(
    (post) => post.username === selectedUser?.username
  );

  if (!selectedUser)
    return (
      <p
        className={`text-center text-lg py-10 ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        User not found
      </p>
    );
  if (!userPost)
    return (
      <p
        className={`text-center text-lg py-10 ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        No user posts found
      </p>
    );

  const isFriend = friend.includes(selectedUser.id);
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <section
      className={`flex flex-col gap-2 md:p-6 p-3 min-h-screen transition-colors duration-300 ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div>
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-200 mb-5 ${
            theme === "light"
              ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
              : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
          }`}
          aria-label="Go back"
        >
          <FaArrowLeft />
          Go Back
        </button>
      </div>
      {/* Profile Info */}
      <div
        className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 p-6 rounded-xl shadow-md ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <img
            src={userInfo?.avatar || "/user.png"}
            alt={`${selectedUser.username}'s avatar`}
            className={`h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-cover rounded-full border-2 transition-all duration-200 mx-auto sm:mx-0 ${
              theme === "light"
                ? "border-gray-300 hover:ring-blue-300 hover:ring-2"
                : "border-gray-600 hover:ring-blue-400 hover:ring-2"
            }`}
          />
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
            <h1
              className={`text-xl md:text-3xl font-bold ${
                theme === "light" ? "text-gray-900" : "text-gray-100"
              }`}
            >
              {selectedUser.username}
            </h1>
            <span
              className={`text-sm md:text-base font-medium px-3 py-1 rounded-full ${
                theme === "light"
                  ? "text-gray-700 bg-green-100"
                  : "text-gray-300 bg-green-800/30"
              }`}
            >
              Mood: {selectedUser.mood || "Happy"}
            </span>
            <span
              className={`text-sm md:text-base font-medium ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {userInfo?.friends || 121} Friends
            </span>
          </div>
        </div>
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={() => toggleFriends(selectedUser.id)}
            className={`px-4 py-2 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 shadow-md ${
              isFriend
                ? theme === "light"
                  ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
                : theme === "light"
                ? "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:ring-1 hover:ring-blue-500 hover:ring-offset-white"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:ring-1 hover:ring-blue-400 hover:ring-offset-gray-800"
            }`}
            disabled={isFriend}
            aria-label={isFriend ? "Friend request pending" : "Add friend"}
          >
            {isFriend ? "Pending" : "Add Friend"}
          </button>
        </div>
      </div>

      {/* Tabs and Content */}
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
          <div className="flex flex-col gap-6 mt-4">
            {userPost.length > 0 ? (
              userPost.map((post) => <PostCard key={post.id} post={post} />)
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
                  Encourage {selectedUser.username} to share their moments!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "About" && (
          <div
            className={`mt-4 p-6 rounded-lg shadow-md ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h2
              className={`text-lg md:text-xl font-semibold ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              } mb-4`}
            >
              About {selectedUser.username}
            </h2>
            <p
              className={`text-sm md:text-base ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {userInfo?.bio || "No bio available yet."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfilePage;
