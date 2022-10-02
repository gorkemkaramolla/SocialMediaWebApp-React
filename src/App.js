import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import { ThemeContextProvider } from "./components/contexts/ThemeContext";
import Page404 from "./components/Errors/ErrorPages/404/Page404";
import Home from "./components/Home/Home";
import AuthLayout from "./components/Layouts/AuthLayout";
import { HomeLayout } from "./components/Layouts/HomeLayout";
import Settings from "./components/Settings/Settings";
import Writer from "./components/Writer/Writer";
function App() {
    const [userData, setuserData] = useState("");

    return (
        <ThemeContextProvider>
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
                            <Route
                                index
                                path="/home"
                                element={<Home />}
                            ></Route>
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
                    <Route path="*" element={<Page404 />}></Route>
                </Routes>
                <Settings></Settings>
            </BrowserRouter>
        </ThemeContextProvider>
    );
}

export default App;
