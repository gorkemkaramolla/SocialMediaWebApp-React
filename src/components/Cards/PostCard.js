import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import javaCoffee from "./javaCoffee.png";
function PostCard(props) {
  return (
    <Card>
      <Card.Img variant="top" src={javaCoffee} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.content}</Card.Text>
        <Button variant="primary">Continue Reading</Button>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
