import React, { useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import UserProfileCard from "./UserProfileCard";
import TrendingTags from "./TrendingTags";
import SuggestedUsers from "./SuggestedUsers";

const SideBar = () => {
  return (
    <div className="h-full bg-white ">
      <div className="hidden fixed md:block p-3 w-[300px]  shadow-md  h-full">
        <UserProfileCard />
        <TrendingTags />
        <SuggestedUsers />
      </div>
    </div>
  );
};

export default SideBar;
