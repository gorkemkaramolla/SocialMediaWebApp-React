import * as React from "react";
import "./Postcard.scss";
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
import { blueGrey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Comment from "./Comments/Comment";
import CommentForm from "./Comments/CommentForm";
import { useState, useRef, useEffect, useReducer } from "react";
import { INITIAL_STATE, postReducer } from "./postReducer";
import { Link } from "react-router-dom";

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
    const isMounted = useRef(false);
    const { writerId, postId, lastName, name, content, title } = props;
    const [refreshComments, setRefreshComments] = useState(true);

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        getComments();
    };

    const handleFavorite = () => {
        setLiked(!liked);
    };
    const setCommentRefresh = () => {
        setRefreshComments(true);
    };
    const getComments = () => {
        const url = "http://localhost:8080";
        axios
            .get(url + "/comments?postId=" + postId)
            .then((response) => {
                dispatch({ type: "FETCH_SUCCESS", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_ERROR" });
            });
        setRefreshComments(false);
    };

    useEffect(() => {
        if (isMounted.current) isMounted.current = false;
        else getComments();
    }, [refreshComments]);

    if (state.error) {
        return <div>ERROR</div>;
    } else if (!state.loading) {
        return <div>Loading...</div>;
    } else
        return (
            <Card
                sx={{
                    marginBottom: "1rem",
                    borderRadius: 3,
                }}
            >
                <CardHeader
                    avatar={
                        <Link
                            className="avatar-link"
                            to={{ pathname: "/writers/" + writerId }}
                        >
                            <Avatar
                                className="avatar-mui"
                                sx={{ bgcolor: blueGrey[500] }}
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
                    <CommentForm
                        setCommentRefresh={setCommentRefresh}
                        name={"Görkem Karamolla"}
                        postId={postId}
                        writerId={1}
                    ></CommentForm>
                    All comments for this post
                    {state.comments.map((comment) => (
                        <div className="row d-flex justify-content-center">
                            <Comment
                                comment={comment.comment}
                                postId={comment.postId}
                                writerId={1}
                                name={"Görkem Karamolla"}
                            ></Comment>
                        </div>
                    ))}
                </Collapse>
            </Card>
        );
}
