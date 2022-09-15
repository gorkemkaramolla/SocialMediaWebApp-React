import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import gorkem from "../images/gorkem.jpg";
export default function MediaCard(props) {
    const { email, userName, bio } = props;
    return (
        <Card
            sx={{ minWidth: 345, width: 650 }}
            className="d-flex justify-content-center flex-column"
        >
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {userName === null ? (
                        <p>you neeed an userName</p>
                    ) : (
                        <p>{userName}</p>
                    )}
                </Typography>
            </CardContent>

            <CardMedia
                className="align-self-center"
                sx={{ padding: "30px", borderRadius: "50%", width: "300px" }}
                component="img"
                height="300"
                image={gorkem}
                alt="green iguana"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {bio}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
