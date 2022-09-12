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
import Comment from "./PostComments/Comment";
import CommentForm from "./PostComments/CommentForm";
import { useState, useRef, useEffect, useReducer, useCallback } from "react";
import { INITIAL_STATE, postReducer } from "./PostReducers/postReducer";
import { ACTION_TYPES } from "./PostReducers/postActionTypes";
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

    const { postLikes, writerId, postId, userName, content, title } = props;
    const [refreshComments, setRefreshComments] = useState(true);

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
    const [likeCount, setLikeCount] = useState(postLikes.length);
    const [likeId, setLikeId] = useState();
    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (!expanded) getComments();
    };

    const likedOrNot = () => {
        const likeControl = postLikes.find((like) => {
            return like.userId === writerId;
        });

        if (likeControl != null) {
            setLikeId(likeControl.id);
            setLiked(true);
        } else {
            setLiked(false);
        }
    };
    useEffect(() => {
        likedOrNot();
    }, []);

    const handleFavorite = () => {
        setLiked(!liked);
        if (liked) {
            setLikeCount(likeCount - 1);
            deleteLike();
        } else {
            setLikeCount(likeCount + 1);
            sendLike();
        }
    };
    const setCommentRefresh = () => {
        setRefreshComments(true);
    };
    let axiosConfig = {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjYyNzI0MzMzLCJleHAiOjE2NjMwNjY2NzV9.fk21fVMuydrPOgD1wdLtxV8DNARR6FsrK5_rVaacMYzr_VpA8EkjUfe4U292e3kHzX1LOVBJBZgGLOUc_DEgaQ",
        },
    };
    const deleteLike = () => {
        axios
            .delete("/postlikes/" + likeId, axiosConfig)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const sendLike = () => {
        axios
            .post(
                "/postlikes",
                {
                    postId: postId,
                    writerId: writerId,
                },
                axiosConfig
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getComments = useCallback(() => {
        const url = "http://localhost:8080";
        axios
            .get(url + "/comments?postId=" + postId, axiosConfig)
            .then((response) => {
                dispatch({
                    type: ACTION_TYPES.success,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({ type: ACTION_TYPES.error });
                console.log(error);
            });
        setRefreshComments(false);
    }, [postId]);

    useEffect(() => {
        if (isMounted.current) isMounted.current = false;
        else getComments();
    }, [getComments, refreshComments]);

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
                                {userName != null &&
                                    userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={userName}
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
                    <div className="d-flex justify-content-end">
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon
                                onClick={handleFavorite}
                                style={liked ? { color: "red" } : null}
                            />
                        </IconButton>
                        <div
                            style={{ fontSize: "1em" }}
                            className="align-self-center "
                        >
                            {likeCount}
                        </div>
                    </div>

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
                    {}
                    <CommentForm
                        setCommentRefresh={setCommentRefresh}
                        name={"Görkem Karamolla"}
                        postId={postId}
                        writerId={1}
                    ></CommentForm>
                    <p> All comments for this post</p>
                    {state.loading
                        ? state.comments.map((comment) => (
                              <div className="row d-flex justify-content-center">
                                  <Comment
                                      comment={comment.comment}
                                      postId={comment.postId}
                                      writerId={1}
                                      name={"Görkem Karamolla"}
                                  ></Comment>
                              </div>
                          ))
                        : "Loading"}
                </Collapse>
            </Card>
        );
}
