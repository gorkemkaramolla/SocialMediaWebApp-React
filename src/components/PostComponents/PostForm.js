import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import ModalError from "../Errors/ModalError";
export default function PostForm(props) {
    const handleSubmit = () => {
        savePost();
        setTitle("");
        setContent("");
        props.refreshPost();
    };
    const handleTitle = (value) => {
        setTitle(value);
    };
    const handleContent = (value) => {
        setContent(value);
    };
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                title: title,
                writerId: 1,
                content: content,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
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
            />

            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    {
                        <TextField
                            value={title}
                            onChange={(title) => {
                                handleTitle(title.target.value);
                            }}
                            className="input-container"
                            fullWidth
                            label="Title"
                            inputProps={{ maxLength: 45 }}
                        ></TextField>
                    }
                </Typography>
                <Typography
                    className="input-container"
                    variant="body2"
                    color="text.secondary"
                >
                    {
                        <TextField
                            value={content}
                            onChange={(content) => {
                                handleContent(content.target.value);
                            }}
                            className="input-container"
                            fullWidth
                            multiline
                            label="Post Content"
                            inputProps={{ maxLength: 250 }}
                        ></TextField>
                    }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Post">
                    <SendIcon onClick={handleSubmit} position="end"></SendIcon>
                </IconButton>
            </CardActions>
        </Card>
    );
}
