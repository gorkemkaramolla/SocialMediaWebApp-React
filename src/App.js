import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Writer from "./components/Writer/Writer";
import NavBarComponent from "./components/Navbar/NavBarComponent";
import { useEffect, useState } from "react";
import { HomeLayout } from "./components/Layouts/HomeLayout";
import AuthLayout from "./components/Layouts/AuthLayout";
function App() {
  const [userData, setuserData] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route
            path="/"
            element={
              <div>
                <HomeLayout />
              </div>
            }
          >
            <Route index path="/home" element={<Home />}></Route>
            <Route
              exact
              path="/profile/:writerId"
              element={
                <div>
                  <Writer />
                </div>
              }
            ></Route>
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
