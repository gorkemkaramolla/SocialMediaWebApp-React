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
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleFavorite = () => {
        setLiked(!liked);
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
                            {props.name != null &&
                                props.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                }
                title={props.name + " " + props.lastName}
                subheader={props.title}
            />

            <CardContent className="alter-border">
                <Typography align="left" variant="body1" color="text.secondary">
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
                    <CommentIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent> </CardContent>
            </Collapse>
        </Card>
    );
}
