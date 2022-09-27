import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import PostForm from "../PostComponents/PostForm";
import { Input } from "@mui/material";
import uploadImage from "../images/upload.png";
import "./profileCard.scss";
import { useNavigate } from "react-router-dom";

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
    <Card
      sx={{ marginTop: "2rem", minWidth: 345, width: 650 }}
      className="d-flex justify-content-center flex-column"
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div"></Typography>
      </CardContent>

      {(requestedWriter === localStorage.getItem("user") &&
        userName === null) ||
      userName === "" ? (
        <div className="d-flex flex-row justify-content-center">
          <TextField
            onChange={(event) => {
              setPickedUsername(event.target.value);
            }}
            value={pickedUserName}
            label="pick a user name"
            sx={{ paddingBottom: "3rem" }}
            inputProps={{
              maxLength: "16",
            }}
            InputProps={{
              maxLength: "1",
              endAdornment: (
                <InputAdornment>
                  <Button onClick={buttonUserName}>choose</Button>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
      ) : (
        <CardContent className="d-flex justify-content-center">
          <Typography sx={{}} variant="h6" component="div">
            {userName}
          </Typography>
        </CardContent>
      )}
      <div className="d-flex justify-content-center flex-column">
        <label className="align-self-center " for="photo">
          <div
            style={{
              border: "none",
              width: 150,
              height: 150,
            }}
            className="profile-icon"
          >
            <Avatar
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                borderRadius: "50%",
              }}
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
                style={{
                  width: "40px",
                  height: "40px",
                }}
                alt={uploadImage}
                src={uploadImage}
              />
            </div>
          </div>
        </label>

        <input
          style={{
            display: "none",
            opacity: 0,
            position: "absolute,",
          }}
          id="photo"
          className="align-self-center"
          type="file"
          accept="image/*"
          value={insertedImagePath}
          onChange={handleProfilePutRequest}
        ></input>
      </div>

      <CardContent className="d-flex justify-content-center">
        <Typography
          sx={{
            padding: "0 25% 0 25%",
            display: "block",
          }}
          variant="h6"
          component="p"
        >
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
      <div
        style={{ minWidth: "350px" }}
        className="col-xxl-6 col-lg-9 col-md-12 col-xs-12 col-sm-12  col-7 col-xs-fluid align-self-center"
      ></div>
    </Card>
  );
}
