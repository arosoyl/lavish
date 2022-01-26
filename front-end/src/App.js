import React from "react";
import {
  Routes, 
  Route,
} 
from 'react-router-dom';

import Home from "./pages/Homepage/Home";
import Login from "./pages/Login/Login";
// import Register from "./components/RegisterForm";
// import Login from "./pages/Login";
// // import  LoginForm from "./components/LoginForm";
// import  Register from "./components/RegisterForm";

// // import { Routes, Route, BrowserRouter } from "react-router-dom";
// import {  Link } from 'react-router-dom';

const App = () => {
 

  return (
  
  <div className="app">
    <nav>
      <ul>
        <li>
          <a href="/">Trang chủ</a>
        </li>
        <li>
          <a href="/events">Hoạt động</a>
        </li>
        <li>
          <a href="/experiences">Nhật ký</a>
        </li>
      </ul>
      <ul>
      <li>
          <a href="/login">Đăng nhập</a>
        </li>
        <li>
          <a href="/register">Đăng ký</a>
        </li>
      </ul>
    </nav>


    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    </Routes>

    

    {/* <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes> */}


  </div>


 

  );
 
};

export default App;
