import React, { useContext } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";
import { AppContext } from "../Context/AppContext";
import UserProfileCard from "./UserProfileCard";
import TrendingTags from "./TrendingTags";
import SuggestedUsers from "./SuggestedUsers";

const Header = () => {
  const { showSidebar, toggleSidebar } = useContext(AppContext);

  return (
    <div className="p-4 flex bg-white md:flex-row items-center justify-around sticky top-0 z-50">
      <button className="block md:hidden p-2 text-2xl" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <h1 className="text-2xl font-bold">FeedUp</h1>

      <div className="flex items-center gap-6">
        <FaSearch className="text-[16px] md:text-[22px] cursor-pointer" />
        <div className="block md:hidden">
          <button className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white md:text-2xl rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-all">
            +
          </button>
        </div>
        <div className="hidden md:block">
          <Button name="Add Post" />
        </div>
        <img
          src="/user.png"
          alt="user"
          className="w-8 h-8 md:h-12 md:w-12 object-cover transition-all duration-300 hover:cursor-pointer rounded-full hover:ring-blue-500 hover:ring-1"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-4/5 max-w-[300px] h-full bg-white shadow-md p-4 transform transition-transform duration-300 ease-in-out z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>

        <div className="mt-8 space-y-4">
          <UserProfileCard />
          <TrendingTags />
          <SuggestedUsers />
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed top-16 left-0 w-full h-full bg-white/50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Header;
