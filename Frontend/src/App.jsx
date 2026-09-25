import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home.jsx";
import Login from "../src/Pages/Login";
import Signup from "../src/Pages/Signup";
import NotFound from "../src/Pages/NotFound";
import ProfilePage from "./Pages/ProfilePage.jsx";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import {useAuth} from "../context/AuthContex.jsx";

const App = () => {
   const { authUser } = useAuth();
  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] bg-center'>
        <Toaster />
      <Routes>
      
        <Route path="/" element={authUser?<Home />:<Navigate to="/login" />} />
        <Route path="/login" element={!authUser?<Login />:<Navigate to="/" />} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to="/"/>} />
        <Route path="/signup" element={!authUser?<Signup /> :<Navigate to="/"/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
