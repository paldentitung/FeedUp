import React, { useContext } from "react";
import UsersData from "../data/UsersData";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

const SuggestedUsers = ({ showAll = false }) => {
  const showAllUsers = showAll ? UsersData : UsersData.slice(0, 6);
  const { friend, toggleFriends, theme } = useContext(AppContext);

  return (
    <div
      className={`p-2 ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      } transition-colors duration-300`}
    >
      <h3
        className={`text-lg font-bold mb-3 ${
          theme === "light" ? "text-gray-900" : "text-gray-100"
        }`}
      >
        Suggested Friends
      </h3>
      <ul className="flex flex-col gap-3">
        {showAllUsers.map((user) => {
          const isFriend = friend.includes(user.id);
          const buttonClasses = isFriend
            ? theme === "light"
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
            : theme === "light"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-blue-600 text-white hover:bg-blue-700";

          return (
            <li key={user.id}>
              <Link
                to={`/user-profile/${encodeURIComponent(user.name)}`}
                className={`flex justify-between items-center p-1 rounded-md transition-colors duration-200 ${
                  theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-2 flex-1">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className={`w-8 h-8 rounded-full object-cover border ${
                      theme === "light" ? "border-gray-200" : "border-gray-600"
                    }`}
                  />
                  <span
                    className={
                      theme === "light" ? "text-gray-800" : "text-gray-200"
                    }
                  >
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // prevent navigation if clicked
                    toggleFriends(user.id);
                  }}
                  className={`px-2 py-1 rounded-md text-sm transition-colors duration-200 ${buttonClasses}`}
                  disabled={isFriend}
                  aria-label={
                    isFriend
                      ? `${user.name} is already your friend`
                      : `Add ${user.name} as friend`
                  }
                >
                  {isFriend ? "Pending" : "Add Friend"}
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SuggestedUsers;
