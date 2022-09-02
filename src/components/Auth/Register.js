import React from "react";
import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

export default function Register() {
    return (
        <div
            style={{ minHeight: "calc(100vh - 80px)" }}
            className="d-flex flex-column  justify-content-center align-items-center"
        >
            <div className="container  " style={{ maxWidth: "800px" }}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="d-flex flex-column  ">
                            <TextField
                                className="mb-3 "
                                label="email"
                            ></TextField>

                            <TextField label="password"></TextField>
                        </div>
                    </div>
                    <div className="col-lg-6 align-self-center">
                        <div className="d-flex flex-column  ">
                            <h4>GO TO LOGIN </h4>

                            <button className="btn btn-outline-dark mr-md-3 mb-2 mb-md-0">
                                <IconButton color="inherit">
                                    <LoginIcon />
                                </IconButton>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
