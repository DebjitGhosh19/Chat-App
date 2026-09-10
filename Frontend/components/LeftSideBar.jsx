import React from "react";
import assets, { userDummyData } from "../src/assets/assets.js";
import { useNavigate } from "react-router-dom";
const LeftSideBar = ({ selectedUser, setselectedUser }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-[#8182B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll scrollbar-none text-white ${selectedUser ? "max-md:hidden" : " "} `}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <div>
            <img src={assets.logo} alt="logo" className="max-w-40" />
          </div>
          <div className="relative group cursor-pointer  ">
            <img src={assets.menu_icon} className="h-8" alt="menu" />
            <div className="absolute top-full p-5 z-20 w-32 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:flex flex-col right-0 cursor-pointer text-center text-2xl gap-2 transition-normal">
              <p onClick={() => navigate("/profile")} className=" text-sm ">
                Edit Profile
              </p>
              <hr className=" border-t border-gray-500" />
              <p className=" text-sm">Logout</p>
            </div>
          </div>
        </div>
        <div className="flex mt-5 bg-[#323251] items-center rounded-full px-4 py-2 gap-2 ">
          <img src={assets.search_icon} className="w-6" alt="" />
          <input
            className="w-full outline-0"
            type="text"
            name=""
            id=""
            placeholder="Search here..."
          />
        </div>

        {userDummyData.map((user, index) => (
          <div onClick={()=>setselectedUser(user)} className={`flex gap-4 items-center mt-5 cursor-pointer max-sm:text-sm  ${selectedUser._id==user._id&&"bg-[#282142]/50"} `} key={index}>
            <img
              className="w-[35px] aspect-[1/1]  rounded-full "
              src={user?.profilePic||assets.avatar_icon}
              alt=""
            />
            <div className="flex  flex-1 gap-6 justify-between leading-5 relative">
              <div className="flex flex-col ">
                <p>{user.fullName}</p>
                <p className=" text-emerald-700 text-xl">online</p>
              </div>
              <p className="bg-violet-500/50 absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full">
                4
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
