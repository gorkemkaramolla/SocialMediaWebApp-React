import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CommentIcon from "@mui/icons-material/Comment";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comment from "./Comments/Comment";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

import "./Postcard.scss";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [comments, setComments] = useState([]);
  const initialMount = useRef(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    getComments();
  };
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      getComments();
    }
  });
  const handleFavorite = () => {
    setLiked(!liked);
  };

  const getComments = () => {
    fetch("/comments", { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          setComments(result);
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <Card sx={{ width: 500, marginBottom: "1rem" }}>
      <CardHeader
        avatar={
          <Link
            className="avatar-link"
            to={{ pathname: "/writers/" + props.writerId }}
          >
            <Avatar
              className="avatar-mui"
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            >
              {props.name != null && props.name.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={props.name + " " + props.lastName}
        subheader={props.title}
      />

      <CardContent className="alter-border">
        <Typography
          multiline
          noWrap={false}
          align="left"
          variant="body1"
          color="text.secondary"
        >
          {props.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            onClick={handleFavorite}
            style={liked ? { color: "red" } : null}
          />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon></CommentIcon>
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {comments.map((element) => (
          <div className="row d-flex justify-content-center">
            <Comment id={element.id} comment={element.comment}></Comment>
          </div>
        ))}
        <Typography variant="body2" color="text.secondary">
          {
            <TextField
              className="input-container"
              fullWidth
              multiline
              label="Post Content"
              inputProps={{ maxLength: 250 }}
            ></TextField>
          }
        </Typography>
      </Collapse>
    </Card>
  );
}
