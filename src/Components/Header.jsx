import React from "react";
import { FaSearch } from "react-icons/fa";
import Button from "./Button";
import { FaBars } from "react-icons/fa";
const Header = () => {
  return (
    <div className="p-4 flex  bg-white  md:flex-row items-center justify-around sticky top-0 z-50 ">
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
    </div>
  );
};

export default Header;
