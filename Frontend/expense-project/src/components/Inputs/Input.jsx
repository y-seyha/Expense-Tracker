import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="mb-4">
      <label className="block text-[13px] text-slate-800 mb-1">{label}</label>

      <div className="relative w-full ">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-slate-100 text-black text-sm rounded px-4 py-3 pr-10 border border-slate-200 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          // className="w-full bg-transparent h-15 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          // className="w-full bg-transparent outline-none"
          // className="w-full h-15   bg-slate-100 text-black text-sm rounded px-4 py-3 pr-10 border border-slate-200 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />

        {/* {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )} */}

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-primary"
          >
            {showPassword ? (
              <FaRegEye className="w-5 h-5" />
            ) : (
              <FaRegEyeSlash className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
