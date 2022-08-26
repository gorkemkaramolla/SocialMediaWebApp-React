import React from "react";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import PostCard from "../PostComponents/PostCard";
import PostForm from "../PostComponents/PostForm";
import "./Home.scss";
export default function Home() {
    const [error, setError] = useState(null);
    const [postList, setPostList] = useState([]);

    const refreshPost = () => {
        axios
            .get("/posts")
            .then((response) => {
                setPostList(response.data);
            })
            .catch((error) => {
                setError(error);
                console.log(error);
            });
    };
    useEffect(() => {
        refreshPost();
    }, []);

    if (error) {
        return <div>Error</div>;
    } else {
        return (
            <div className="container">
                <PostForm
                    name="Görkem"
                    lastName="karamolla"
                    writerId={1}
                    refreshPost={refreshPost}
                ></PostForm>
                {postList.map((element) => (
                    <div className="row d-flex justify-content-center">
                        <PostCard
                            postId={element.id}
                            writerId={element.userId}
                            lastName={element.lastName}
                            name={element.name}
                            title={element.title}
                            content={element.content}
                        ></PostCard>
                    </div>
                ))}
            </div>
        );
    }
}
