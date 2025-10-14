import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const SideBar = ({ showMenu, setShowMenu }) => {
  return (
    <div className="h-full">
      <div className="hidden md:block p-2  shadow-md  h-full">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut alias amet
        magnam eaque doloremque, magni architecto, facilis optio repudiandae
        tenetur, labore iste! Quo alias eius adipisci dignissimos necessitatibus
        deleniti ullam?
      </div>

      <button
        className="block md:hidden p-2 text-2xl"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FaBars />
      </button>

      <div
        className={`fixed top-16 left-0 w-4/5 max-w-[300px] h-[calc(100vh-4rem)] bg-white shadow-md p-4 transform transition-transform duration-300 ease-in-out z-50 ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setShowMenu(false)}
        >
          <FaTimes />
        </button>
        <div className="mt-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
          reprehenderit neque iusto mollitia ducimus, unde enim officia
          excepturi reiciendis autem? Qui, expedita reprehenderit minima facere
          eaque illum ad sequi numquam.
        </div>
      </div>

      {showMenu && (
        <div
          className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white/50 bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default SideBar;
