import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Writer from "./components/Writer/Writer";
import NavBar from "./components/Navbar/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Postx from "./components/Post";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/writers/:writerId" element={<Writer />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
