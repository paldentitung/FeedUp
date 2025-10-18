import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { FaTimes } from "react-icons/fa";

const Modal = ({ children }) => {
  const { showModal, toggleModal } = useContext(AppContext);

  if (!showModal) return null;
  React.useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex justify-center items-center">
      {/* Modal content */}
      <div className="relative bg-white rounded-lg  p-6 shadow-lg">
        {/* Close button */}
        <button
          onClick={toggleModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
