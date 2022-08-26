import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CommentIcon from "@mui/icons-material/Comment";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useRef, useEffect } from "react";

import { CardContent, InputAdornment } from "@mui/material";
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
export default function Comment(props) {
    const { postId, comment, writerId, name } = props;
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const handleFavorite = () => {
        setLiked(!liked);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
                sx={{
                    width: "90%",
                    marginBottom: "1rem",
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
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                            >
                                {name != null && name.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={name}
                    subheader={"22/03/2027"}
                />
                <CardContent>
                    <Typography>
                        <InputAdornment sx={{ color: "red " }} position="start">
                            {comment}
                        </InputAdornment>
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
            </Card>
        </div>
    );
}
