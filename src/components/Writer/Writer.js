import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormHelperText, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import PostForm from "../PostComponents/PostForm";
import ProfileCard from "./ProfileCard";
import "./writer.scss";
export default function Writer() {
  const [writerInfo, setWriterInfo] = useState({
    userName: "",
    bio: "",
    email: "",
    imgPath: null,
  });
  let axiosConfig = {
    headers: {
      Authorization: localStorage.getItem("access"),
    },
  };
  useEffect(() => {
    getWriterInformations();
  });
  const getWriterInformations = () => {
    axios
      .get("/writers/" + writerId, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setWriterInfo((prev) => ({
          ...prev,
          userName: response.data.userName,
          bio: response.data.bio,
          email: response.data.email,
          imgPath: response.data.imgPath,
        }));
      })
      .catch((e) => {
        console.error(e);
      });
    console.log(writerInfo);
  };

  const { writerId } = useParams();
  return (
    <div className="container ">
      <div className="row d-flex justify-content-start">
        <div className="col-lg-12 col-md-fluid col-xs-fluid col-sm-fluid col-xxl-fluid col-fluid col-xs-fluid d-flex justify-content-center ">
          <ProfileCard
            image={writerInfo.imgPath}
            userName={writerInfo.userName}
            bio={writerInfo.bio}
            imgPath={writerInfo.imgPath}
            requestedWriter={writerId}
          />
        </div>
        <div className="col-lg-12 col-md-fluid col-xs-fluid col-sm-fluid col-xxl-fluid col-fluid col-xs-fluid d-flex justify-content-center ">
          {writerId === localStorage.getItem("user") ? (
            <PostForm
              userName={localStorage.getItem("userName")}
              writerId={writerId}
            ></PostForm>
          ) : null}
        </div>
      </div>
      <div className="row d-flex justify-content-center"></div>
    </div>
  );
}
