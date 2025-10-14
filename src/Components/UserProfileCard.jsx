import React from "react";

const UserProfileCard = () => {
  return (
    <div className="flex justify-center items-center flex-col space-y-4 p-3 ">
      <div className="overflow-hidden rounded-full">
        <img
          src="/user.png"
          alt="user avater"
          className="w-16 h-16 transition-all duration-200 hover:cursor-pointer hover:scale-110"
        />
      </div>
      <div className="text-center">
        <h3 className="font-semibold">John Doe</h3>
        <p className="text-sm text-gray-500">Feeling happy 😊</p>
        <p className="text-xs text-gray-400 mt-1">Posts: 42 | Reactions: 120</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
