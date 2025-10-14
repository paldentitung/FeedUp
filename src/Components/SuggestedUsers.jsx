import React, { use, useState } from "react";
import UsersData from "../data/UsersData";

const SuggestedUsers = ({ showAll = false }) => {
  const showAllUsers = showAll ? UsersData : UsersData.slice(0, 6);

  return (
    <div className="p-2">
      <h3 className="text-lg font-semibold mb-3">Suggested Friends</h3>
      <div className="flex flex-col gap-3">
        {showAllUsers.map((user) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
