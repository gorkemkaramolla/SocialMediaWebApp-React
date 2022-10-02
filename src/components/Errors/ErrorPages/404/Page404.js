import React from "react";
import "./Page404.scss";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
    let history = useNavigate();
    return (
        <div id="page404">
            <div className="text404">
                <Typography variant="h2" gutterBottom id="h404">
                    Code : 404
                </Typography>
                <hr />
                <Typography variant="h5" gutterBottom id="p404">
                    This Page is Unreachable The link may be broken or the page
                    may have been removed. Check if the connection you are
                    trying to open is correct.
                </Typography>
                <div className="mt-5">
                    <Typography
                        className="buttons"
                        variant="h6"
                        gutterBottom
                        id="h404"
                        onClick={() => {
                            history("/");
                        }}
                    >
                        Return Home
                    </Typography>
                    <Typography
                        className="buttons"
                        variant="h6"
                        onClick={() => {
                            history(-1);
                        }}
                    >
                        Back
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Page404;
