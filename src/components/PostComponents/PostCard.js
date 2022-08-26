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
import axios from "axios";
import Comment from "./Comments/Comment";
import { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";

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
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
    const isMounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const { writerId, postId, lastName, name, content, title } = props;
    const handleExpandClick = () => {
        setExpanded(!expanded);
        getComments();
    };
    const handleFavorite = () => {
        setLiked(!liked);
    };

    const getComments = () => {
        const url = "http://localhost:8080";
        axios
            .get(url + "/comments?postId=" + postId)
            .then((response) => {
                setLoading(true);
                setComments(response.data);
            })
            .catch((error) => {
                setLoading(true);

                console.log(error);
                setError(error);
            });
    };

    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = false;
        } else getComments();
    }, []);
    if (error) {
        return <div>ERROR</div>;
    } else if (!loading) {
        return <div>Loading...</div>;
    } else
        return (
            <Card sx={{ width: 500, marginBottom: "1rem" }}>
                <CardHeader
                    avatar={
                        <Link
                            className="avatar-link"
                            to={{ pathname: "/writers/" + writerId }}
                        >
                            <Avatar
                                className="avatar-mui"
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                            >
                                {name != null && name.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={name + " " + lastName}
                    subheader={title}
                />

                <CardContent className="alter-border">
                    <Typography
                        multiline
                        noWrap={false}
                        align="left"
                        variant="body1"
                        color="text.secondary"
                    >
                        {content}
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
                    {comments.map((comment) => (
                        <div className="row d-flex justify-content-center">
                            <Comment
                                comment={comment.comment}
                                postId={comment.postId}
                                writerId={1}
                                name={"User"}
                            ></Comment>
                        </div>
                    ))}
                </Collapse>
            </Card>
        );
}
