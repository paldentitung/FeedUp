import React, { useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import UserProfileCard from "./UserProfileCard";
import TrendingTags from "./TrendingTags";
import SuggestedUsers from "./SuggestedUsers";
import { FiLogOut } from "react-icons/fi";
import Modal from "./Modal";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { toggleModal, handleLogIn, setShowModal, toggleTheme, theme } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    handleLogIn(false);
    navigate("/register");
    setShowModal(false);
  };

  return (
    <div
      className={`h-full ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      } transition-colors duration-300`}
    >
      <div
        className={`hidden fixed p-3 w-[300px] md:flex flex-col shadow-md h-full ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <UserProfileCard />
        <TrendingTags />
        <SuggestedUsers />
        <div
          className={`p-4 mx-auto mt-10 cursor-pointer ${
            theme === "light"
              ? "text-gray-600 hover:text-blue-500"
              : "text-gray-300 hover:text-blue-400"
          }`}
          onClick={toggleModal}
        >
          <FiLogOut size={25} />
        </div>

        {/* Theme Toggle */}
        <div
          onClick={toggleTheme}
          className={`flex items-center w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-300 ${
            theme === "light" ? "bg-gray-300" : "bg-gray-600"
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full transform transition-transform duration-300 ${
              theme === "light"
                ? "translate-x-0 bg-white shadow-md"
                : "translate-x-8 bg-gray-900 shadow-sm"
            }`}
          ></span>
        </div>
      </div>
      <Modal>
        <div
          className={`flex flex-col text-center justify-center items-center gap-5 w-full h-full max-w-[300px] max-h-[300px] rounded-lg 
      transition-colors duration-300
   
    `}
        >
          <p className="text-lg font-medium">Are you sure?</p>
          <div className="flex gap-5">
            <button
              onClick={handleLogOut}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 shadow-md
          ${
            theme === "light"
              ? "bg-blue-500 text-white hover:ring-1 hover:ring-blue-500 hover:ring-offset-white shadow-md"
              : "bg-blue-600 text-white hover:ring-1 hover:ring-blue-400 hover:ring-offset-gray-700 shadow-lg"
          }
        `}
            >
              Log Out
            </button>
            <button
              onClick={toggleModal}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 shadow-md
          ${
            theme === "light"
              ? "bg-red-500 text-white hover:ring-1 hover:ring-red-500 hover:ring-offset-white shadow-md"
              : "bg-red-600 text-white hover:ring-1 hover:ring-red-400 hover:ring-offset-gray-700 shadow-lg"
          }
        `}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SideBar;
