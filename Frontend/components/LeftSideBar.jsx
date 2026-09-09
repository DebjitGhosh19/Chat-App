import React from "react";
import assets from "../src/assets/assets.js";

const LeftSideBar = ({ selectedUser, setselectedUser }) => {
  return (
    <div
      className={`bg-[#8182B2]/10 h-full p-5 rounded-r-xl overflow-scroll text-white ${selectedUser ? "max-md:hidden" : " "} `}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <div>
            <img src={assets.logo} alt="logo" className="max-w-40" />
          </div>
          <div className="relative group cursor-pointer  ">
            <img src={assets.menu_icon} className="h-8" alt="menu" />
            <div className="absolute hidden group-hover:flex flex-col  p-2  bg-amber-400 w-40 right-0 cursor-pointer py-4 text-center text-2xl gap-2 transition-normal">
              <p className="hover:text-black ">Edit Profile</p>
              <hr />
              <p className="hover:text-black">Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
