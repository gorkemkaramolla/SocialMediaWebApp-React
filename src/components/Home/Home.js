import React from "react";
import Post from "../Post";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import PostCard from "../Cards/PostCard";
export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch("/posts", { method: "GET" })
      .then((response) => response.json())
      .then(
        (result) => {
          setisLoaded(true);
          console.log(result);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setisLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error</div>;
  } else {
    return (
      <Container>
        {postList.map((element) => (
          <Row style={{ justifyContent: "center" }}>
            <PostCard
              userId={element.userId}
              lastName={element.lastName}
              name={element.name}
              title={element.title}
              content={element.content}
            ></PostCard>
          </Row>
        ))}
      </Container>
    );
  }
}
