import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Writer from "./components/Writer/Writer";
import NavBarComponent from "./components/Navbar/NavBarComponent";
import { useEffect, useState } from "react";

function App() {
    const [userData, setuserData] = useState("");

    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route
                        index
                        path="/"
                        element={
                            localStorage.getItem("user") === null ? (
                                <Login />
                            ) : (
                                <div>
                                    <NavBarComponent></NavBarComponent>
                                    <Home />
                                </div>
                            )
                        }
                    ></Route>
                    <Route
                        path="/home"
                        element={
                            <div>
                                <NavBarComponent></NavBarComponent>
                                <Home />
                            </div>
                        }
                    ></Route>
                </Route>
                <Route
                    exact
                    path="/profile/:writerId"
                    element={
                        <div>
                            <NavBarComponent></NavBarComponent>
                            <Writer />
                        </div>
                    }
                ></Route>
                <Route exact path="/register" element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
