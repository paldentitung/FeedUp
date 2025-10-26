import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { FaTimes } from "react-icons/fa";

const Modal = ({ children }) => {
  const { showModal, toggleModal, theme } = useContext(AppContext);

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
    <div
      className={`fixed inset-0 z-[9999] flex justify-center items-center transition-all duration-300 ${
        theme === "light" ? "bg-black/50" : "bg-black/60"
      }`}
    >
      {/* Modal content */}
      <div
        className={`relative rounded-lg p-6 shadow-lg max-w-[90vw] max-h-[90vh] overflow-auto ${
          theme === "light"
            ? "bg-white text-gray-900"
            : "bg-gray-800 text-gray-100"
        }`}
      >
        {/* Close button */}
        <button
          onClick={toggleModal}
          className={`absolute top-3 right-3 transition-colors duration-200 ${
            theme === "light"
              ? "text-gray-600 hover:text-gray-800"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <FaTimes size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
