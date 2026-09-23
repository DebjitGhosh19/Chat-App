import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext(null);
const Backend_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
axios.defaults.baseURL = Backend_URL;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

 //check if user is authenticated and if so,set the user data and connect the soket 
 const checkAuth=async () => {
    try {
       
    } catch (error) {
        
    }
 }
  return (
    <AuthContext.Provider
      value={{
        axios,
        authUser,
        setAuthUser,
        onlineUsers,
        socket,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
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
