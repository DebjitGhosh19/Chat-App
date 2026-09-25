import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import {io} from "socket.io-client"
const AuthContext = createContext(null);
const Backend_URL =  "http://localhost:4000";
axios.defaults.baseURL = Backend_URL;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

 //check if user is authenticated and if so,set the user data and connect the socket 
 const checkAuth=async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
       axios.defaults.headers.common["token"] = storedToken;
       const {data}=await axios.get("/api/auth/check", {
         headers: { token: storedToken },
       });

       if (data.success) {
        setAuthUser(data.user)
        connectSocket(data.user)
       }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        setToken(null);
        axios.defaults.headers.common["token"] = null;
      }
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }
// Login/Signup  function to handel authentication and socket connection
const login=async (state,credentials) => {
  try {
    const {data}=await axios.post(`/api/auth/${state}`,credentials)
    if (data.success) {
      setAuthUser(data.user)
      connectSocket(data.user)
      axios.defaults.headers.common["token"]=data.token
      setToken(data.token);
      localStorage.setItem("token",data.token)
      toast.success(data.message)
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message)
  }
}
//Logout  function to handel authentication and socket disconnection
const logout=async () => {
  localStorage.removeItem("token");
  setToken(null)
  setAuthUser(null)
  setOnlineUsers([])
  axios.defaults.headers.common["token"]=null
  toast.success("Logged out sucessfully")
  socket?.disconnect()
}
// Update profile function to handel user profile updates
const updateProfile=async (body) => {
  try {
    const {data}=await axios.put("/api/auth/update-profile",body);
    if (data.success) {
      setAuthUser(data.user)
      toast.success("Profile updated sucessfully")
    }
  } catch (error) {
    toast.error(error.message)
  }
}

//connect socket function to hendel socket connection and online users updates
const connectSocket=(userData)=>{
  if (!userData || socket?.connected) return
  const newSocket=io(Backend_URL,{
    query:{
      userId:userData._id,
    }
  });
  newSocket.connect();
  setSocket(newSocket);
  newSocket.on("getOnlineUsers",(userIds)=>{
    setOnlineUsers(userIds)
  })
}

// 
    useEffect(() => {
      if (token) {
        axios.defaults.headers.common["token"]=token
      }
      checkAuth()
    }, [])

    
    const value={
        axios,
        authUser,
        setAuthUser,
        onlineUsers,
        socket,
        loading,
        login,
        logout,
        updateProfile
      }

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export default AuthContext;
