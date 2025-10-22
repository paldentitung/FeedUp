import React, { useContext } from "react";
import UsersData from "../data/UsersData";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

const SuggestedUsers = ({ showAll = false }) => {
  const showAllUsers = showAll ? UsersData : UsersData.slice(0, 8);
  const { friend, toggleFriends } = useContext(AppContext);

  return (
    <div className="p-2">
      <h3 className="text-lg font-bold mb-3">Suggested Friends</h3>
      <ul className="flex flex-col gap-3">
        {showAllUsers.map((user) => {
          const isFriend = friend.includes(user.id);
          const buttonClasses = isFriend
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600";

          return (
            <li key={user.id}>
              <Link
                to={`/user-profile/${encodeURIComponent(user.name)}`}
                className="flex justify-between items-center p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <div className="flex items-center gap-2 flex-1">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                  <span>{user.name}</span>
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
