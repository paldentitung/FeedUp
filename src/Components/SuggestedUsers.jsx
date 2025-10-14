import React, { use, useContext, useState } from "react";
import UsersData from "../data/UsersData";
import { AppContext } from "../Context/AppContext";

const SuggestedUsers = ({ showAll = false }) => {
  const showAllUsers = showAll ? UsersData : UsersData.slice(0, 6);
  const { friend, setFriend, toggleFriends } = useContext(AppContext);
  return (
    <div className="p-2">
      <h3 className="text-lg font-semibold mb-3">Suggested Friends</h3>
      <div className="flex flex-col gap-3">
        {showAllUsers.map((user) => {
          const isFriend = friend.includes(user.id);
          return (
            <div
              key={user.id}
              className="flex justify-between items-center p-1 hover:bg-gray-100 hover:cursor-pointer rounded-md transition-colors duration-200"
            >
              <div className="flex items-center gap-1 flex-1">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <span>{user.name}</span>
              </div>
              <button
                onClick={() => toggleFriends(user.id)}
                className={`px-2 py-1 rounded-md text-sm transition-colors duration-200 ${
                  isFriend
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={isFriend}
              >
                {isFriend ? "Pending" : "Add Friend"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedUsers;
