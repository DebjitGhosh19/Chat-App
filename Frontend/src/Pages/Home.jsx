import React, { useState } from 'react'
import LeftSideBar from '../../components/LeftSideBar'
import ChatContainer from '../../components/ChatContainer'
import RightSideBar from '../../components/RightSideBar'
import { useChat } from '../../context/ChatContext'

const Home = () => {
  // const [selectedUser, setselectedUser] = useState(false)
    const {
      selectedUser,
      setSelectedUser,
      getUsers,
      users,
      unseenMessages,
      setUnseenMessages,
    } = useChat();
  return (
    <div className='w-full h-screen text-white sm:px-[15%] sm:py-[5%]'>
    <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser?'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'} `}>
      <LeftSideBar />
      <ChatContainer />
      <RightSideBar />
    </div>
    </div>
  )
}

export default Home
