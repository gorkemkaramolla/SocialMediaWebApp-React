import React from "react";
import axios from "axios";
import { useEffect, useReducer } from "react";
import PostCard from "../PostComponents/PostCard";
import PostForm from "../PostComponents/PostForm";
import "./Home.scss";
import Loading from "./loadingAnim/Loading";
import { homeReducer, INITIAL_STATE } from "./homeReducers/homeReducer";
import { ACTION_TYPES } from "./homeReducers/homeActionTypes";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [state, dispatch] = useReducer(homeReducer, INITIAL_STATE);
    let history = useNavigate();
    let axiosConfig = {
        headers: {
            Authorization: localStorage.getItem("access"),
        },
    };
    const refreshPost = async () => {
        await axios
            .get("/posts", axiosConfig)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    dispatch({
                        type: ACTION_TYPES.success,
                        payload: response.data,
                    });
                }, 1000);
            })
            .catch((error) => {
                dispatch({ type: ACTION_TYPES.error });

                console.log(error);
                localStorage.clear();
            });
    };

    useEffect(() => {
        refreshPost();
    }, []);

    if (state.error) {
        setTimeout(() => {
            history("/", { replace: true });
        }, 300);
    } else if (!state.loading) {
        return <Loading />;
    } else {
        return (
            <div className="container">
                <div
                    className="row d-flex justify-content-center home-bg"
                    style={{
                        minWidth: "360px",
                        padding: "30px",
                        borderRadius: "20px",
                    }}
                >
                    <div className="d-flex flex-column justify-content-center ">
                        <div
                            style={{ minWidth: "350px" }}
                            className="col-lg-6 col-md-6 col-xs-6 col-sm-6 col-xxl-6 col-6 col-xs-fluid align-self-center"
                        >
                            <PostForm
                                userName={localStorage.getItem("userName")}
                                writerId={localStorage.getItem("user")}
                                refreshPost={refreshPost}
                            ></PostForm>
                        </div>
                        {state.postList.map((element) => (
                            <div
                                style={{ minWidth: "350px" }}
                                className="col-lg-6 col-md-6 col-xs-6 col-sm-6 col-xxl-6 col-6 align-self-center  "
                            >
                                <PostCard
                                    postId={element.id}
                                    writerId={localStorage.getItem("user")}
                                    userName={element.userName}
                                    title={element.title}
                                    content={element.content}
                                    postLikes={element.postLikes}
                                ></PostCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
