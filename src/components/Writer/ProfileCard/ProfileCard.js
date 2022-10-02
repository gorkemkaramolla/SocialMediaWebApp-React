import { InputAdornment, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../images/upload.png";
import "./ProfileCard.scss";

export default function MediaCard(props) {
    let history = useNavigate();

    const { email, userName, bio, imgPath, requestedWriter } = props;
    const [pickedUserName, setPickedUsername] = useState("");
    const [insertedImagePath, setInsertedImagePath] = useState("");
    const handleProfilePutRequest = (event) => {
        axios
            .put(
                `/writers/${localStorage.getItem("user")}`,
                {
                    imgPath: event.target.files[0].name,
                },
                axiosConfig
            )
            .then((response) => {
                localStorage.setItem("profileImagePath", response.data.imgPath);

                console.log(response.data);
                history(0);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const buttonUserName = () => {
        postUserNameData();
    };
    let axiosConfig = {
        headers: {
            Authorization: localStorage.getItem("access"),
        },
    };

    const postUserNameData = () => {
        axios
            .put(
                `/writers/username/${localStorage.getItem("user")}`,
                {
                    userName: pickedUserName,
                },
                axiosConfig
            )
            .then((response) => {
                localStorage.setItem("userName", response.data);

                history(0);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    return (
        <Card className="card-container">
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                ></Typography>
            </CardContent>

            {(requestedWriter === localStorage.getItem("user") &&
                userName === null) ||
            userName === "" ? (
                <div className="text-field-container">
                    <TextField
                        onChange={(event) => {
                            setPickedUsername(event.target.value);
                        }}
                        value={pickedUserName}
                        label="pick a user name"
                        inputProps={{
                            maxLength: "16",
                        }}
                        InputProps={{
                            maxLength: "1",
                            endAdornment: (
                                <InputAdornment>
                                    <Button onClick={buttonUserName}>
                                        choose
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>
                </div>
            ) : (
                <CardContent className="field-text-else">
                    <Typography sx={{}} variant="h6" component="div">
                        {userName}
                    </Typography>
                </CardContent>
            )}
            <div className="avatar-container">
                <label for="photo">
                    <div className="profile-icon">
                        <Avatar
                            className="avatar-image"
                            src={
                                imgPath === null || imgPath === ""
                                    ? "/images/user.png"
                                    : `/images/${imgPath}`
                            }
                            alt=""
                        />

                        <div className="overlay">
                            <img
                                className="icon"
                                alt={uploadImage}
                                src={uploadImage}
                            />
                        </div>
                    </div>
                </label>

                <input
                    id="photo"
                    className="align-self-center"
                    type="file"
                    accept="image/*"
                    value={insertedImagePath}
                    onChange={handleProfilePutRequest}
                ></input>
            </div>

            <CardContent className="content-card">
                <Typography className="typo" variant="h6" component="p">
                    {bio}
                    <hr />
                </Typography>
            </CardContent>
            <CardContent></CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {email}
                </Typography>
            </CardContent>
            <div className="col-xxl-6 col-lg-9 col-md-12 col-xs-12 col-sm-12  col-7 col-xs-fluid  holder"></div>
        </Card>
    );
}
