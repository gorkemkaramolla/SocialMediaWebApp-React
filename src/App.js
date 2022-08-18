import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Postx from "./components/Post";

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Postx></Postx>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
