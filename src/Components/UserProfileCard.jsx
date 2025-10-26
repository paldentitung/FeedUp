import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

const UserProfileCard = () => {
  const { currentUser, theme } = useContext(AppContext);

  if (!currentUser) {
    return (
      <div
        className={`flex justify-center items-center flex-col space-y-4 p-3 ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div className="overflow-hidden rounded-full">
          <img
            src="/user.png"
            alt="user avatar"
            className="w-16 h-16 transition-all duration-200 hover:cursor-pointer hover:scale-110"
          />
        </div>
        <div className="text-center">
          <h3
            className={`font-semibold ${
              theme === "light" ? "text-gray-900" : "text-gray-100"
            }`}
          >
            currentUser
          </h3>
          <p
            className={`text-sm ${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            status
          </p>
        </div>
      </div>
    ); // Placeholder for no user
  }

  const username = currentUser ? currentUser.username : "currentuser";

  return (
    <div
      className={`flex justify-center items-center flex-col space-y-4 p-3 ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      }`}
    >
      <Link
        to={`/${currentUser.username}`}
        className="overflow-hidden rounded-full"
      >
        <img
          src={currentUser.avatar || "/user.png"}
          alt="user avatar"
          className="w-16 h-16 transition-all duration-200 hover:cursor-pointer hover:scale-110"
        />
      </Link>
      <div className="text-center">
        <h3
          className={`font-semibold ${
            theme === "light" ? "text-gray-900" : "text-gray-100"
          }`}
        >
          {username}
        </h3>
        <p
          className={`text-sm ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {currentUser.status}
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;
