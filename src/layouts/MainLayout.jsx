import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";

const MainLayout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen flex flex-col">
      {/* Define a fixed height for Header */}
      <Header className="h-16" />

      <main className="flex w-full min-h-[100vh]  bg-gray-100">
        <aside className="md:w-[300px]">
          <SideBar showMenu={showMenu} setShowMenu={setShowMenu} />
        </aside>
        <section className="flex-1">{children}</section>
      </main>
    </div>
  );
};

export default MainLayout;
