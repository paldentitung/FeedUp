import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { FaTimes } from "react-icons/fa";
const Modal = ({ children }) => {
  const { showModal, toggleModal } = useContext(AppContext);
  return (
    <>
      {showModal && (
        <div
          className={` fixed inset-0 bg-white/80 min-h-screen w-full flex justify-center items-center flex-colz-50 `}
        >
          <div className="flex justify-center items-center  w-full  max-w-6xl  ">
            {children}
          </div>
          <button onClick={toggleModal}>
            <FaTimes />
          </button>
        </div>
      )}
    </>
  );
};

export default Modal;
