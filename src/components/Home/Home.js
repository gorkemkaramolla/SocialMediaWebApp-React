import { React, useContext } from "react";
import axios from "axios";
import { useEffect, useReducer } from "react";
import PostForm from "../PostComponents/PostForm/PostForm";
import PostCard from "../PostComponents/PostCard/PostCard";
import "./Home.scss";
import Loading from "./loadingAnim/Loading";
import { homeReducer, INITIAL_STATE } from "./homeReducers/homeReducer";
import { ACTION_TYPES } from "./homeReducers/homeActionTypes";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";

export default function Home() {
    const theme = useContext(ThemeContext);

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
                console.log(response.data);
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
                <div className="home-row">
                    <div className="home-container">
                        <div className="home-column col-lg-6 col-md-6 col-xs-6 col-sm-6 col-xxl-6 col-6 col-xs-fluid ">
                            <PostForm
                                mode={theme.themeValue}
                                userName={localStorage.getItem("userName")}
                                writerId={localStorage.getItem("user")}
                                refreshPost={refreshPost}
                                profileImagePath={
                                    localStorage.getItem("profileImagePath") ===
                                        "" ||
                                    localStorage.getItem("profileImagePath") ==
                                        null
                                        ? "user.png"
                                        : localStorage.getItem(
                                              "profileImagePath"
                                          )
                                }
                            ></PostForm>
                        </div>
                        {state.postList.map((element) => (
                            <div
                                id="post-card-container"
                                key={element.id}
                                className="col-lg-6 col-md-6 col-xs-6 col-sm-6 col-xxl-6 col-6"
                            >
                                <PostCard
                                    postId={element.id}
                                    writerId={localStorage.getItem("user")}
                                    userName={element.userName}
                                    title={element.title}
                                    content={element.content}
                                    postLikes={element.postLikes}
                                    profileImagePath={element.imagePath}
                                ></PostCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
