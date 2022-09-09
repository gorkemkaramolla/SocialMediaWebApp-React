import React from "react";
import axios from "axios";
import { useEffect, useReducer } from "react";
import PostCard from "../PostComponents/PostCard";
import PostForm from "../PostComponents/PostForm";
import "./Home.scss";
import { homeReducer, INITIAL_STATE } from "./homeReducers/homeReducer";
import { ACTION_TYPES } from "./homeReducers/homeActionTypes";
import Cookies from "js-cookie";

export default function Home() {
    const getCookie = () => {
        console.log(Cookies.get("session"));
    };
    const [state, dispatch] = useReducer(homeReducer, INITIAL_STATE);
    let axiosConfig = {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjYyNzI0MzMzLCJleHAiOjE2NjMwNjY2NzV9.fk21fVMuydrPOgD1wdLtxV8DNARR6FsrK5_rVaacMYzr_VpA8EkjUfe4U292e3kHzX1LOVBJBZgGLOUc_DEgaQ",
        },
    };
    const refreshPost = async () => {
        await axios
            .get("/posts", axiosConfig)
            .then((response) => {
                dispatch({
                    type: ACTION_TYPES.success,
                    payload: response.data,
                });
                console.log(response.data);
            })
            .catch((error) => {
                dispatch({ type: ACTION_TYPES.error });

                console.log(error);
            });
    };

    useEffect(() => {
        getCookie();
        refreshPost();
    }, []);

    if (state.error) {
        return <div>Error</div>;
    } else if (!state.loading) {
        return <div>Loading...</div>;
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
                                name="Görkem"
                                lastName="karamolla"
                                writerId={1}
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
                                    writerId={element.userId}
                                    lastName={element.lastName}
                                    name={element.name}
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
