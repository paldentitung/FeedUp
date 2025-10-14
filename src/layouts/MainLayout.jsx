import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";

const MainLayout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  // Prevent body scrolling when sidebar is open
  React.useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen flex flex-col">
      {/* Define a fixed height for Header */}
      <Header className="h-16" />

      <main className="flex w-full min-h-[calc(100vh-4rem)] gap-5 bg-gray-100">
        <aside className="md:w-[300px]">
          <SideBar showMenu={showMenu} setShowMenu={setShowMenu} />
        </aside>
        <section className="flex-1">{children}</section>
      </main>
    </div>
  );
};

export default MainLayout;
