import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../PostComponents/PostForm/PostForm";
import ProfileCard from "./ProfileCard/ProfileCard";
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
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-fluid col-xs-fluid col-sm-fluid col-xxl-fluid col-fluid col-xs-fluid profile-card-container">
                    <ProfileCard
                        image={writerInfo.imgPath}
                        userName={writerInfo.userName}
                        bio={writerInfo.bio}
                        imgPath={writerInfo.imgPath}
                        requestedWriter={writerId}
                    />
                </div>
                <div className="col-lg-12 col-md-fluid col-xs-fluid col-sm-fluid col-xxl-fluid col-fluid col-xs-fluid profile-card-container">
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
