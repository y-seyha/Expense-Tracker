import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import UserContext from "../../context/UserContext";

const SideMenu = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    if (path === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* Profile */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full bg-slate-400"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center">
            <span className="text-gray-500">Guest</span>
          </div>
        )}
        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || "Guest"}
        </h5>
      </div>

      {/* Menu */}
      {SIDE_MENU_DATA.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={index}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${
              isActive
                ? "text-white bg-primary"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
