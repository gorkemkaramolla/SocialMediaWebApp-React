import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardContent } from "@mui/material";

export default function Comment(props) {
    const { postId, comment, writerId, name } = props;
    return (
        <div>
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
            />
            <CardContent>
                <Typography>{comment}</Typography>
            </CardContent>
        </div>
    );
}
