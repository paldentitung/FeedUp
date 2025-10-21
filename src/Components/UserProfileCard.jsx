import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const UserProfileCard = () => {
  const { currentUser } = useContext(AppContext);
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center flex-col space-y-4 p-3 ">
        <div className="overflow-hidden rounded-full">
          <img
            src={"/user.png"}
            alt="user avater"
            className="w-16 h-16 transition-all duration-200 hover:cursor-pointer hover:scale-110"
          />
        </div>
        <div className="text-center">
          <h3 className="font-semibold">currentUser</h3>
          <p className="text-sm text-gray-500">status</p>
        </div>
      </div>
    ); // or a placeholder
  }
  const username = currentUser ? currentUser.username : "currentuser";
  return (
    <div className="flex justify-center items-center flex-col space-y-4 p-3 ">
      <div className="overflow-hidden rounded-full">
        <img
          src={currentUser.avatar || "user.png"}
          alt="user avater"
          className="w-16 h-16 transition-all duration-200 hover:cursor-pointer hover:scale-110"
        />
      </div>
      <div className="text-center">
        <h3 className="font-semibold">{username}</h3>
        <p className="text-sm text-gray-500">{currentUser.status}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
