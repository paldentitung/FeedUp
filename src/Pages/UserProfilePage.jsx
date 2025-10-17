import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import UsersData from "../data/UsersData";
import PostCard from "../Components/PostCard";

const UserProfilePage = () => {
  const { posts, friend, toggleFriends } = useContext(AppContext);
  const { username } = useParams();

  const selectedUser = posts.find((user) => user.username === username);
  const userInfo = UsersData.find(
    (user) => user.name === selectedUser?.username
  );
  const userPost = posts.filter(
    (post) => post.username === selectedUser.username
  );

  if (!selectedUser)
    return (
      <p className="text-center text-gray-500 text-lg py-10">User not found</p>
    );
  if (!userPost)
    return (
      <p className="text-center text-gray-500 text-lg py-10">
        No user posts found
      </p>
    );

  const isFriend = friend.includes(selectedUser.id);
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <section className="flex flex-col gap-4 md:p-6 p-3 bg-gray-100 min-h-screen">
      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <img
            src={userInfo?.avatar}
            alt={`${selectedUser.username}'s avatar`}
            className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-cover rounded-full border-2 border-gray-300 ring-2 ring-transparent hover:ring-blue-300 transition-all duration-200 mx-auto sm:mx-0"
          />
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
              {selectedUser.username}
            </h1>
            <span className="text-sm md:text-base font-medium text-gray-700 bg-green-100 px-3 py-1 rounded-full">
              Mood: {selectedUser.mood || "Happy"}
            </span>
            <span className="text-sm md:text-base font-medium text-gray-600">
              {userInfo?.friends || 121} Friends
            </span>
          </div>
        </div>
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={() => toggleFriends(selectedUser.id)}
            className={`px-4 py-2 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 shadow-md ${
              isFriend
                ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
            }`}
            disabled={isFriend}
            aria-label={isFriend ? "Friend request pending" : "Add friend"}
          >
            {isFriend ? "Pending" : "Add Friend"}
          </button>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="bg-white rounded-xl shadow-md p-4">
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
          <div className="flex flex-col gap-6 mt-4">
            {userPost.length > 0 ? (
              userPost.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">No posts yet.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Encourage {selectedUser.username} to share their moments!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "About" && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              About {selectedUser.username}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {userInfo?.bio ||
                "No bio available yet. Stay tuned for more details!"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfilePage;
