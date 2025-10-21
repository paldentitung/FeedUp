import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { FaTimes } from "react-icons/fa";

const Modal = ({ children }) => {
  const { showModal, toggleModal } = useContext(AppContext);

  useEffect(() => {
    if (showModal) {
      // Get scrollbar width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      // Disable scrolling and add padding to compensate for scrollbar
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Restore scrolling and remove padding
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    // Cleanup on unmount or when showModal changes
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex justify-center items-center">
      {/* Modal content */}
      <div className="relative bg-white rounded-lg p-6 shadow-lg">
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
