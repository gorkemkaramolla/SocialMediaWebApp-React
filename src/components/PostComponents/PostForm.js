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
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import "./Postcard.scss";

export default function PostForm(props) {
    return (
        <Card sx={{ width: 800, marginBottom: "1rem" }}>
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
                title={props.title}
            />

            <CardContent>
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
                <Typography
                    className="input-container"
                    variant="body2"
                    color="text.secondary"
                >
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
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Post">
                    <SendIcon position="end"></SendIcon>
                </IconButton>
            </CardActions>
        </Card>
    );
}
