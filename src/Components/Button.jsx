import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 border bg-blue-500 text-white rounded-md shadow-md transition-all duration-300 hover:cursor-pointer hover:shadow-lg"
    >
      {name}
    </button>
  );
};

export default Button;
