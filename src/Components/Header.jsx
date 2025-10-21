import React, { useContext, useState } from "react";
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
    register,
    handleLogIn,
    toggleModal,
    setShowModal,
    showModal,
    setSearchTerm,
    currentUser,
  } = useContext(AppContext);
  const navigator = useNavigate();
  // Prevent body scrolling when sidebar is open
  React.useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSidebar, showModal]);

  const handleLogOut = () => {
    setCurrentUser(null);
    handleLogIn(false);
    navigator("/register");
    setShowModal(false);
  };

  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="p-6 flex bg-white md:flex-row items-center justify-between  sticky top-0 z-30">
      <div className="flex ga-1 items-center">
        <button
          className="block md:hidden p-2 text-2xl"
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
              className="absolute right-0 bg-gray-100 rounded-full px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 flex items-center"
            >
              <FaSearch className="text-gray-500 text-sm mr-2" />
              <input
                type="text"
                placeholder="Search posts..."
                className="bg-transparent flex-1 text-sm outline-none placeholder-gray-400"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaTimes
                className="text-gray-500 ml-2 cursor-pointer hover:text-red-500 transition"
                onClick={() => {
                  setShowSearchBar(false);
                  setSearchTerm("");
                }}
              />
            </motion.div>
          ) : (
            <FaSearch
              onClick={() => setShowSearchBar(true)}
              className="text-[22px] cursor-pointer hover:text-blue-500 transition"
            />
          )}
        </div>

        {/* 🔍 Mobile Search Icon */}
        <div className="md:hidden">
          <FaSearch
            onClick={() => setShowSearchBar(!showSearchBar)}
            className="text-[18px] cursor-pointer hover:text-blue-500 transition"
          />
        </div>

        {/* 🔍 Mobile Search Bar (fixed below header) */}
        {showSearchBar && (
          <AnimatePresence>
            {" "}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-[70px] left-0 w-full bg-white shadow-md px-6 py-4 border-t border-gray-200 flex items-center md:hidden z-40"
            >
              <FaSearch className="text-gray-500 text-sm mr-2" />
              <input
                type="text"
                placeholder="Search posts..."
                className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaTimes
                className="text-gray-500 ml-3 cursor-pointer hover:text-red-500"
                onClick={() => {
                  setShowSearchBar(false);
                  setSearchTerm("");
                }}
              />
            </motion.div>
          </AnimatePresence>
        )}

        <Link to="/add-post">
          <button
            className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white md:text-2xl rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
            title="Add Post"
          >
            +
          </button>
        </Link>

        {logIn ? (
          <>
            <Link to={`/${currentUser?.username}`}>
              <img
                src={currentUser?.avatar}
                alt="user"
                className="w-8 h-8  object-cover transition-all duration-300 hover:cursor-pointer rounded-full hover:ring-blue-500 hover:ring-1"
              />
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full transition-all duration-200 hover:cursor-pointer active:opacity-75">
                Register
              </button>
            </Link>{" "}
          </>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={` fixed top-0 left-0 w-4/5 max-w-[300px] h-full bg-white shadow-md p-4 transform transition-transform duration-300 ease-in-out z-50 overflow-auto ${
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
          <div className="p-4 mx-auto mt-10" onClick={toggleModal}>
            <FiLogOut size={25} />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed top-16 left-0 w-full h-full overflow-auto bg-white/50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <Modal>
        <div className="flex flex-col text-center justify-center items-center gap-5 bg-white w-full h-full max-w-[300px] max-h-[300px]">
          <p>Are you sure ? </p>
          <div className="flex gap-5">
            <button
              onClick={handleLogOut}
              className="px-6 py-2 shadow rounded-md bg-blue-500 text-white transition-all duration-300 hover:cursor-pointer hover:ring-1 hover:"
            >
              Log Out
            </button>
            <button
              onClick={toggleModal}
              className="px-6 py-2 shadow rounded-md  bg-red-500  text-white transition-all duration-300 hover:cursor-pointer hover:ring-1 hover:"
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
