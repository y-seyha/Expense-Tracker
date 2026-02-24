import React from "react";
import card2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expenses Tracker</h2>
        {children}
      </div>

      <div
        className="hidden md:flex w-[40vw] h-screen 
bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center
overflow-hidden p-8 relative items-center justify-center"
      >
        <div className="w-24 h-24 md:w-48 md:h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div>

        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10"></div>

        <div className="w-48 h-48 rounded-[40%] bg-violet-500 absolute -bottom-7 -left-5"></div>

        <div className="z-20 flex flex-col items-center gap-8">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expense"
            value="168000.00"
            color="bg-primary"
          />

          <img
            src={card2}
            className="w-72 lg:w-[80%] shadow-lg shadow-blue-400/15"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className=" absolute top-5 w-full flex  gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-b-gray-400/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>

      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">${value}</span>
      </div>
    </div>
  );
};
