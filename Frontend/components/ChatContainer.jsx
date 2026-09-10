import React, { useEffect, useState } from "react";
import assets, { messagesDummyData, userDummyData } from "../src/assets/assets.js";
import { data } from "react-router-dom";
const ChatContainer = ({ selectedUser, setselectedUser }) => {
  const [sender, setSender] = useState([])
  useEffect(() => {
   const nedFun=async () => {
     const Data=messagesDummyData.filter((mess)=>mess.senderId==selectedUser._id)
    setSender(Data)
   }
   nedFun()
  }, [selectedUser])
  
  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {console.log(selectedUser,sender)}
      {/* Header */}
      <div className="flex  p-2 mt-3 border border-stone-500  justify-between ">
        <div className="flex items-center gap-2  ">
          <img src={selectedUser.profilePic} className="h-10 rounded-full" alt="" />
          <p className="flex-1 text-lg text-white flex items-center gap-2">{selectedUser.fullName} <span className="h-2 w-2 rounded-full bg-green-400"></span></p>
        </div>
        <img onClick={()=>setselectedUser(null)} src={assets.arrow_icon} className="md:hidden max-w-7" alt="" />
    <img src={assets.help_icon} className="max-md:hidden  " alt="" />
    
      </div>
      <hr />
      {/* Chat Area */}
    <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
      {
        messagesDummyData.map((mess,index)=>(
          <div key={index} className={`flex items-end gap-2 justify-end ${mess.senderId!=="680f571ff10f3cd28382f094"&&'flex-row-reverse'}`} >
           {
            mess.image?(
              <img src={mess.image} className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8" />
            ):(
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${mess.senderId!=="680f571ff10f3cd28382f094" ?'rounded-br-none':'rounded-bl-none'}`} >{mess.text}</p>
            )
           }
           <div className="text-center text-xs" >
           <img src="" alt="" />
           </div>
          </div>
        ))
      }
    </div>
    </div>
  ): <div className=" flex flex-col gap-2 text-gray-500 bg-white/10 max-md:hidden items-center justify-center">
    <img className=" w-1/2" src={assets.logo}  alt="" />
    <p>Chat anytime, anywhere</p>
  </div>
};

export default ChatContainer;
