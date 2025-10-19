import React, { useContext } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";
import { AppContext } from "../Context/AppContext";
import UserProfileCard from "./UserProfileCard";
import TrendingTags from "./TrendingTags";
import SuggestedUsers from "./SuggestedUsers";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Modal from "./Modal";
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
    handleLogIn(false);
    navigator("/register");
    setShowModal(false);
  };
  return (
    <div className="p-4 flex bg-white md:flex-row items-center justify-around sticky top-0 z-30">
      <button className="block md:hidden p-2 text-2xl" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <Link to="/">
        <h1 className="text-2xl font-bold">FeedUp</h1>
      </Link>
      <div className="flex items-center gap-6">
        <FaSearch className="text-[16px] md:text-[22px] cursor-pointer" />
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
            <img
              src="/user.png"
              alt="user"
              className="w-8 h-8  object-cover transition-all duration-300 hover:cursor-pointer rounded-full hover:ring-blue-500 hover:ring-1"
            />
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
