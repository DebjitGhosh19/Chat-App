import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home.jsx";
import Login from "../src/Pages/Login";
import Signup from "../src/Pages/Signup";
import NotFound from "../src/Pages/NotFound";
import ProfilePage from "./Pages/ProfilePage.jsx";
const App = () => {
  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] bg-center'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
