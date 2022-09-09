import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import SuccessMessage from "../Errors/SuccessMessage";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

export default function PostForm(props) {
    const [sent, setSent] = useState(false);
    const [aPost, setApost] = useState({
        title: "",
        content: "",
        writerId: 1,
    });
    const { name, lastName, refreshPost, writerId } = props;

    const handleSubmit = () => {
        if (aPost.title && aPost.content !== "") {
            savePost();
            setSent(true);
        }
        setApost((prev) => ({ ...prev }));
        setTimeout(() => {
            refreshPost();
        }, 500);
    };

    const handleTitle = (value) => {
        setApost((prev) => ({
            ...prev,
            title: value,
        }));
        setSent(false);
    };
    const handleContent = (value) => {
        setApost((prev) => ({
            ...prev,
            content: value,
        }));
        setSent(false);
    };

    let axiosConfig = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjYyNzIzNzE2LCJleHAiOjE2NjMwNjYwNTl9.oNF90BHNZ1zPShoz45eUfX5DSY3GKCHHU1kBTHs5zJmdB2fpDtB9GeMZw9AmY6p0UbDKDcI6l-Ak9pzq8-AbyA",
        },
    };
    const savePost = () => {
        axios
            .post(
                "/posts",
                {
                    aPost,
                },
                axiosConfig
            )
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
    };

    return (
        <div>
            {sent && (
                <SuccessMessage
                    message="Success"
                    variant="filled"
                    color="success"
                ></SuccessMessage>
            )}
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
                                sx={{ bgcolor: teal[500] }}
                                aria-label="recipe"
                            >
                                {name != null && name.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={name + " " + lastName}
                />

                <CardContent className="d-flex justify-content-center flex-wrap">
                    <FormControl
                        sx={{
                            paddingLeft: 1,
                            marginBottom: 1,
                            width: "95%",
                            textAlign: "left",
                            borderRadius: "0px 10px",
                            background: "#f0f2f5",
                        }}
                    >
                        <TextField
                            onChange={(e) => {
                                handleTitle(e.target.value);
                            }}
                            value={aPost.title}
                            variant="standard"
                            multiline
                            placeholder={"Title"}
                            inputProps={{ maxLength: 55 }}
                            InputProps={{
                                disableUnderline: true, // <== added this
                            }}
                        ></TextField>
                    </FormControl>
                    <FormControl
                        sx={{
                            paddingLeft: 1,
                            width: "95%",
                            textAlign: "left",
                            borderRadius: "0px 10px ",

                            background: "#f0f2f5",
                        }}
                    >
                        <TextField
                            onChange={(e) => {
                                handleContent(e.target.value);
                            }}
                            value={aPost.content}
                            variant="standard"
                            multiline
                            placeholder={"Content"}
                            inputProps={{ maxLength: 250 }}
                            InputProps={{
                                disableUnderline: true, // <== added this
                            }}
                        ></TextField>
                    </FormControl>
                </CardContent>
                <CardActions disableSpacing sx={{ float: "right" }}>
                    <Button
                        size="small"
                        variant="text"
                        color="primary"
                        endIcon={<SendIcon />}
                        onClick={handleSubmit}
                    >
                        Send
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
