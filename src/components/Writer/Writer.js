import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormHelperText, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import PostForm from "../PostComponents/PostForm";
import ProfileCard from "./ProfileCard";
import "./writer.scss";
export default function Writer() {
    const [writerInfo, setWriterInfo] = useState({
        userName: "",
        bio: "",
        email: "",
    });
    let axiosConfig = {
        headers: {
            Authorization: localStorage.getItem("access"),
        },
    };
    useEffect(() => {
        getWriterInformations();
    }, []);
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
                }));
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const { writerId } = useParams();
    return (
        <div className="container ">
            <div className="row d-flex justify-content-start">
                <div className="col-lg-12 col-md-fluid col-xs-fluid col-sm-fluid col-xxl-fluid col-fluid col-xs-fluid d-flex justify-content-center ">
                    <ProfileCard
                        userName={localStorage.getItem("userName")}
                        bio={writerInfo.bio}
                    ></ProfileCard>
                </div>
            </div>
            <div className="row d-flex justify-content-center"></div>
        </div>
    );
}
