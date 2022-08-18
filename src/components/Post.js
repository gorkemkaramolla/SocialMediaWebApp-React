import { useEffect, useState } from "react";
import PostCard from "./Cards/PostCard";
import "./styles/Post.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Post() {
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
  const styles = {
    center: {
      margin: "0 auto",
    },
  };
  if (error) {
    return <div>Error</div>;
  } else {
    return (
      <Container>
        {postList.map(({ title, content }) => (
          <Col xs={8} className="mb-3  " style={styles.center}>
            <PostCard title={title} content={content}></PostCard>
          </Col>
        ))}
      </Container>
    );
  }
}
