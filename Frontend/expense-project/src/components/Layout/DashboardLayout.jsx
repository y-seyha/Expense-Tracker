import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="max-[1080px]:hidden">
          <SideMenu />
        </div>

        {/* Main content */}
        <div className="flex-1 p-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
