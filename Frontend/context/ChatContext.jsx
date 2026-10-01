import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContex";
import toast from "react-hot-toast";
import axios from "axios";
import { data } from "react-router-dom";
const Backend_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
axios.defaults.baseURL = Backend_URL;
const ChatContext = createContext(null);

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { axios, socket } = useAuth();
  // Function to get all users for sidebar
  const getUsers = async () => {
    try {
      const response = await axios.get(`${Backend_URL}/api/messages/users`, {
        headers: { token: token },
      });
      console.log(response);

      if (response.data.success) {
        setUsers(response.data.users);
        setUnseenMessages(response.data.unseenMessages);

        console.log("ok");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //Function to get messages for selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`${Backend_URL}/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //function to send message to selected user
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `${Backend_URL}/api/messages/send/${selectedUser._id}`,
        messageData,
      );

      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      
    }
  };

  //function to subscribe  to messages for selected user

  // const subscribeToMessages = async () => {
  //   if (!socket) return;
  //   socket.on("newMessage", (newMessage) => {
  //     if (selectedUser && newMessage.senderId === selectedUser._id) {
  //       newMessage.seen = true;
  //       setMessages((prevMesssages) => [...prevMesssages, newMessage]);
  //       axios.put(`${Backend_URL}/api/messages/mark/${newMessage._id}`);
  //     } else {
  //       setUnseenMessages((prevUnseenMessages) => ({
  //         ...prevUnseenMessages,
  //         [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
  //           ? prevUnseenMessages[newMessage.senderId] + 1
  //           : 1,
  //       }));
  //     }
  //   });
  // };
  const subscribeToMessages = () => {
  if (!socket) return;

  console.log("🔌 Listening for newMessage event");

  socket.on("newMessage", (newMessage) => {
    console.log("📩 New message received:", newMessage);

    if (
      selectedUser &&
      newMessage.senderId.toString() === selectedUser._id.toString()
    ) {
      newMessage.seen = true;

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
      ]);

      axios.put(
        `${Backend_URL}/api/messages/mark/${newMessage._id}`
      );

    } else {
      setUnseenMessages((prevUnseenMessages) => ({
        ...prevUnseenMessages,

        [newMessage.senderId]:
          prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
      }));
    }
  });
};
  //function to unsubscribe  from messages

  const unsubscribeFromMessages = async () => {
    if (socket) socket.off("newMessage");
  };

  // useEffect(() => {
  //   subscribeToMessages();
  //   return () => unsubscribeFromMessages();
    
  // }, [socket, selectedUser]);
  useEffect(() => {
  if (!socket) return;

  subscribeToMessages();

  return () => {
    socket.off("newMessage");
  };
}, [socket, selectedUser]);

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
      getMessages
    }),
    [messages,  users,selectedUser,   unseenMessages,isTyping],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
