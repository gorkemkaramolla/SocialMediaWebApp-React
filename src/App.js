import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Writer from "./components/Writer/Writer";
import NavBarComponent from "./components/Navbar/NavBarComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function App() {
  return (
    <BrowserRouter>
      <NavBarComponent></NavBarComponent>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/writers/:writerId" element={<Writer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
