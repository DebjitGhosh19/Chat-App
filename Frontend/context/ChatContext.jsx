import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContex';
import toast from 'react-hot-toast';

const ChatContext = createContext(null);

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages ,setUnseenMessages] = useState({})
  const [isTyping, setIsTyping] = useState(false);

  const {axios,socket}=useAuth()
// Function to get all users for sidebar
const getUsers=async () => {
    try {
      const {data}=  await axios.get('/api/messages/users');
      if (data.sucess) {
        setUsers(data.users)
        setUnseenMessages(data.unseenMessages)
      }
    } catch (error) {
        toast.error(error.messages)
    }
}
//Function to get messages for selected user
const getMessages=async (userId) => {
    try {
    const {data}=await axios.get('/api/messages/${userId}')
    if (data.sucess) {
        setMessages(data.messages)
    }
    } catch (error) {
        toast.error(error.messages)
    }
}
//function to send message to selected user
const sendMessage=async (messageData) => {
  try {
    const {data}=await axios.post(`/api/message/send/${selectedUser._id}`,messageData)
  
  if (data.sucess) {
    setMessages((prevMessages)=>[...prevMessages,data.newMessage])
  }
  else{
    toast.error(data.messages)
  }
  } catch (error) {
     toast.error(data.messages)
  }
}

//function to subscribe  to messages for selected user

const subscribeToMessages=async () => {
  if (!socket) return
  socket.on("newMessage",(newMessage)=>{
if (selectedUser && newMessage.senderId===selectedUser._id) {
  newMessage.seen=true;
  setMessages((prevMesssages)=>[...prevMesssages,newMessage]);
  axios.put(`/api/messages/mark/${newMessage._id}`);
}
else{
  setUnseenMessages((prevUnseenMessages)=>({
    ...prevUnseenMessages,[newMessage.senderId]:prevUnseenMessages[newMessage.senderId]?prevUnseenMessages[newMessage.senderId]+1:1
  }))
}
  })
}
  //function to unsubscribe  from messages

const unsubscribeFromMessages=async () => {
  if (socket) socket.off("newMessage");
}
  
useEffect(() => {
 subscribeToMessages();
 return ()=> unsubscribeFromMessages
}, [socket,selectedUser])


  const value = useMemo(
    () => ({
      messages,
      users,
      setMessages,
      selectedUser,
      getUsers,
      setMessages,
      setSelectedUser,
      unseenMessages,
      setUnseenMessages,
      isTyping,
      setIsTyping,
      sendMessage,
    }),
    [messages, selectedUser, isTyping]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
