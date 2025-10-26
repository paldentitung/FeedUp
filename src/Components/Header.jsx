import React, { useContext, useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";
import UserProfileCard from "./UserProfileCard";
import TrendingTags from "./TrendingTags";
import SuggestedUsers from "./SuggestedUsers";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const {
    showSidebar,
    toggleSidebar,
    logIn,
    handleLogIn,
    toggleModal,
    setShowModal,
    showModal,
    setSearchTerm,
    currentUser,
    theme,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Prevent body scrolling when sidebar or modal is open
  useEffect(() => {
    if (showSidebar || showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSidebar, showModal]);

  const handleLogOut = () => {
    handleLogIn(false);
    navigate("/register");
    setShowModal(false);
  };

  return (
    <div
      className={`p-6 flex md:flex-row items-center justify-between sticky top-0 z-30 transition-colors duration-300 ${
        theme === "light"
          ? "bg-white text-gray-900"
          : "bg-gray-800 text-gray-100"
      }`}
    >
      <div className="flex gap-1 items-center">
        <button
          className={`block md:hidden p-2 text-2xl ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          } hover:text-blue-400 transition-colors duration-200`}
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <Link to="/">
          <h1 className="text-2xl font-bold">FeedUp</h1>
        </Link>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        {/* 🔍 Desktop Search Bar */}
        <div className="hidden md:flex items-center gap-3 relative">
          {showSearchBar ? (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 250 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute right-0 rounded-full px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 flex items-center ${
                theme === "light" ? "bg-gray-100" : "bg-gray-700"
              }`}
            >
              <FaSearch
                className={`text-sm mr-2 ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search posts..."
                className={`flex-1 text-sm outline-none placeholder-gray-400 ${
                  theme === "light"
                    ? "bg-transparent text-gray-900"
                    : "bg-transparent text-gray-100"
                }`}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaTimes
                className={`ml-2 cursor-pointer transition-colors duration-200 ${
                  theme === "light"
                    ? "text-gray-500 hover:text-red-500"
                    : "text-gray-400 hover:text-red-400"
                }`}
                onClick={() => {
                  setShowSearchBar(false);
                  setSearchTerm("");
                }}
              />
            </motion.div>
          ) : (
            <FaSearch
              onClick={() => setShowSearchBar(true)}
              className={`text-[22px] cursor-pointer transition-colors duration-200 ${
                theme === "light"
                  ? "text-gray-600 hover:text-blue-500"
                  : "text-gray-300 hover:text-blue-400"
              }`}
            />
          )}
        </div>

        {/* 🔍 Mobile Search Icon */}
        <div className="md:hidden">
          <FaSearch
            onClick={() => setShowSearchBar(!showSearchBar)}
            className={`text-[18px] cursor-pointer transition-colors duration-200 ${
              theme === "light"
                ? "text-gray-600 hover:text-blue-500"
                : "text-gray-300 hover:text-blue-400"
            }`}
          />
        </div>

        {/* 🔍 Mobile Search Bar (fixed below header) */}
        {showSearchBar && (
          <AnimatePresence>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed top-[70px] left-0 w-full px-6 py-4 border-t flex items-center md:hidden z-40 ${
                theme === "light"
                  ? "bg-white border-gray-200 shadow-md"
                  : "bg-gray-800 border-gray-600 shadow-lg"
              }`}
            >
              <FaSearch
                className={`text-sm mr-2 ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search posts..."
                className={`flex-1 border rounded-full px-3 py-2 text-sm outline-none focus:ring-2 ${
                  theme === "light"
                    ? "border-gray-300 text-gray-900 focus:ring-blue-500 placeholder-gray-400"
                    : "border-gray-600 text-gray-100 focus:ring-blue-400 placeholder-gray-400"
                }`}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaTimes
                className={`ml-3 cursor-pointer transition-colors duration-200 ${
                  theme === "light"
                    ? "text-gray-500 hover:text-red-500"
                    : "text-gray-400 hover:text-red-400"
                }`}
                onClick={() => {
                  setShowSearchBar(false);
                  setSearchTerm("");
                }}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {currentUser ? (
          <>
            <Link to="/add-post">
              <button
                className={`flex items-center justify-center w-8 h-8 rounded-full shadow-md transition-all duration-200 hover:scale-105 ${
                  theme === "light"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                title="Add Post"
              >
                +
              </button>
            </Link>
            <Link to={`/${currentUser?.username}`}>
              <img
                src={currentUser?.avatar || "/user.png"}
                alt="user avatar"
                className={`w-8 h-8 object-cover rounded-full transition-all duration-300 hover:cursor-pointer ${
                  theme === "light"
                    ? "hover:ring-blue-500 hover:ring-1"
                    : "hover:ring-blue-400 hover:ring-1"
                }`}
              />
            </Link>
          </>
        ) : (
          <Link to="/register">
            <button
              className={`px-4 py-2 rounded-full text-white transition-all duration-200 hover:cursor-pointer active:opacity-75 ${
                theme === "light"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Register
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-4/5 max-w-[300px] h-full shadow-md p-4 transform transition-transform duration-300 ease-in-out z-50 overflow-auto ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <button
          className={`absolute top-4 right-4 text-2xl transition-colors duration-200 ${
            theme === "light"
              ? "text-gray-600 hover:text-gray-800"
              : "text-gray-300 hover:text-gray-100"
          }`}
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>

        <div className="mt-8 space-y-4">
          <UserProfileCard />
          <TrendingTags />
          <SuggestedUsers />
          <div
            className={`p-4 mx-auto mt-10 cursor-pointer transition-colors duration-200 ${
              theme === "light"
                ? "text-gray-600 hover:text-blue-500"
                : "text-gray-300 hover:text-blue-400"
            }`}
            onClick={toggleModal}
          >
            <FiLogOut size={25} />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          className={`fixed top-0 left-0 w-full h-full z-40 md:hidden transition-colors duration-300 ${
            theme === "light" ? "bg-black/50" : "bg-black/60"
          }`}
          onClick={toggleSidebar}
        ></div>
      )}

      <Modal>
        <div
          className={`flex flex-col text-center justify-center items-center gap-5 w-full h-full max-w-[300px] max-h-[300px] rounded-lg ${
            theme === "light"
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-gray-100"
          }`}
        >
          <p>Are you sure?</p>
          <div className="flex gap-5">
            <button
              onClick={handleLogOut}
              className={`px-6 py-2 shadow rounded-md text-white transition-all duration-300 hover:cursor-pointer hover:ring-1 hover:ring-offset-2 ${
                theme === "light"
                  ? "bg-blue-500 hover:bg-blue-600 hover:ring-blue-500 hover:ring-offset-white"
                  : "bg-blue-600 hover:bg-blue-700 hover:ring-blue-400 hover:ring-offset-gray-800"
              }`}
            >
              Log Out
            </button>
            <button
              onClick={toggleModal}
              className={`px-6 py-2 shadow rounded-md text-white transition-all duration-300 hover:cursor-pointer hover:ring-1 hover:ring-offset-2 ${
                theme === "light"
                  ? "bg-red-500 hover:bg-red-600 hover:ring-red-500 hover:ring-offset-white"
                  : "bg-red-600 hover:bg-red-700 hover:ring-red-400 hover:ring-offset-gray-800"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
