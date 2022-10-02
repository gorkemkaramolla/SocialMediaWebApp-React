import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import "./loading.scss";
const Loading = () => {
    return (
        <div className="loading-anim">
            <CircularProgress size={70} color="secondary" />
        </div>
    );
};

export default Loading;
