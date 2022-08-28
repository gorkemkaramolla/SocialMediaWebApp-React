import React from "react";
import { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

export default function CommentForm(props) {
    const textArea = useRef(null);
    const [comment, setComment] = useState("");
    const { setCommentRefresh, name, postId } = props;
    const saveComment = () => {
        axios
            .post("/comments", {
                writerId: 1,
                postId: postId,
                comment: comment,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleChange = (value) => {
        setComment(value);
    };
    const handlePostComment = () => {
        comment !== "" && saveComment();
        setComment("");
        setTimeout(() => {
            setCommentRefresh();
        }, 500);
    };
    return (
        <div
            ref={textArea}
            className="d-flex justify-content-center align-items-center"
        >
            <TextField
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                value={comment}
                variant="standard"
                multiline
                placeholder={`Say something to ${name}`}
                style={{
                    margin: 10,
                    paddingLeft: 10,
                    width: "90%",
                    textAlign: "left",
                    borderRadius: "0px 10px",
                    background: "#f0f2f5",
                }}
                inputProps={{ maxLength: 250 }}
                InputProps={{
                    disableUnderline: true, // <== added this
                    endAdornment: (
                        <IconButton
                            onClick={handlePostComment}
                            contentEditable={false}
                            className="align-self-center"
                        >
                            <SendIcon></SendIcon>
                        </IconButton>
                    ),
                }}
            ></TextField>
        </div>
    );
}
