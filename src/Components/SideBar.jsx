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
  const { toggleModal, handleLogIn, setShowModal } = useContext(AppContext);
  const navigator = useNavigate();
  const handleLogOut = () => {
    handleLogIn(false);
    navigator("/register");
    setShowModal(false);
  };
  return (
    <div className="h-full bg-white ">
      <div className="hidden fixed  p-3 w-[300px] md:flex flex-col  shadow-md  h-full">
        <UserProfileCard />
        <TrendingTags />
        <SuggestedUsers />
        <div className="p-4 mx-auto mt-10" onClick={toggleModal}>
          <FiLogOut size={25} />
        </div>
      </div>
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

export default SideBar;
