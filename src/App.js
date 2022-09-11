import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Writer from "./components/Writer/Writer";
import NavBarComponent from "./components/Navbar/NavBarComponent";
function App() {
    return (
        <BrowserRouter>
            <NavBarComponent></NavBarComponent>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route
                    exact
                    path="/profile/:writerId"
                    element={<Writer />}
                ></Route>
                <Route exact path="/register" element={<Register />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
