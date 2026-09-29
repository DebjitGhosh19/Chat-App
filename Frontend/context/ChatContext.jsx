import { createContext, useContext, useMemo, useState } from 'react';
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

  const sendMessage = (text) => {
    const trimmedText = text?.trim();

    if (!trimmedText) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: trimmedText,
      sender: 'me',
      createdAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const value = useMemo(
    () => ({
      messages,
      setMessages,
      selectedUser,
      setSelectedUser,
      isTyping,
      setIsTyping,
      sendMessage,
    }),
    [messages, selectedUser, isTyping]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
