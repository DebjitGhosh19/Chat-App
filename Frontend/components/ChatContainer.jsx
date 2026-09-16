import React, { useEffect, useRef, useState } from "react";
import assets, {
  messagesDummyData,
  userDummyData,
} from "../src/assets/assets.js";
import { data } from "react-router-dom";
import { formatMessageTime } from "../src/lib/utils.js";
const ChatContainer = ({ selectedUser, setselectedUser }) => {
  const [sender, setSender] = useState([]);
 
const scrollEnd=useRef()
useEffect(() => {
  if (scrollEnd.current) {
    scrollEnd.current.scrollIntoView({behavior:"smooth"})
  }
}, [])

  return selectedUser ? (
    <div className="h-full overflow-auto scrollbar-none relative backdrop-blur-lg">
      {console.log(selectedUser, sender)}
      {/* Header */}
      <div className="flex  p-2 mt-3   justify-between ">
        <div className="flex items-center gap-2  ">
          <img
            src={selectedUser.profilePic}
            className="h-10 rounded-full"
            alt=""
          />
          <p className="flex-1 text-lg text-white flex items-center gap-2">
            {selectedUser.fullName}{" "}
            <span className="h-2 w-2 rounded-full bg-green-400"></span>
          </p>
        </div>
        <img
          onClick={() => setselectedUser(null)}
          src={assets.arrow_icon}
          className="md:hidden max-w-7"
          alt=""
        />
        <img src={assets.help_icon} className="max-md:hidden  " alt="" />
      </div>
      <hr />
      {/* Chat Area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-auto scrollbar-none p-3 pb-6">
        {messagesDummyData.map((mess, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${mess.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"}`}
          >
            {mess.image ? (
              <img
                src={mess.image}
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${mess.senderId !== "680f50e4f10f3cd28382ecf9" ? "rounded-br-none" : "rounded-bl-none"}`}
              >
                {mess.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  mess.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt=""
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">{formatMessageTime(mess.createdAt)}</p>
            </div>
          </div>
        ))}
     <div ref={scrollEnd}> 

     </div>
      </div>
      {/* Bottom area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex flex-1 items-center bg-gray-100/12 px-3 rounded-full ">
          <input className="flex-1 text-sm p-3 border-none rounded-lg outline-0 text-white placeholder-gray-400" type="text" name="" id=""  placeholder="send a message" />
          <input type="file" name="" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer" />
          </label>
        </div>
        <img src={assets.send_button} alt=""  className="w-7 cursor-pointer"/>
      </div>
    </div>
  ) : (
    <div className=" flex flex-col gap-2 text-gray-500 bg-white/10 max-md:hidden items-center justify-center">
      <img className=" w-1/2" src={assets.logo} alt="" />
      <p>Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
