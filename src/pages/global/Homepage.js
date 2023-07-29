import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarPage from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

const Homepage = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <SidebarPage isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <section className="content-box">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Homepage;
