import React from "react";
import { TextField } from "@mui/material";
import { GiTripleYin } from "react-icons/gi";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import { red, orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterError from "../Errors/RegisterError";
import "./Register.scss";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Register() {
    const [loading, setLoading] = React.useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {}, [registerError.error]);
    function handleClick() {
        setLoading(true);
        handleRegisterRequest();
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmail = (value) => {
        setEmail(value);
    };
    const handlePassword = (value) => {
        setPassword(value);
    };

    const handleRegisterRequest = () => {
        if (email)
            axios
                .post("/auth/register", {
                    email: email,
                    password: password,
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    setRegisterError(true);
                    setErrorMessage(error.response.data);

                    setLoading(false);
                });
    };
    const theme = createTheme({
        palette: {
            primary: {
                main: "rgba(199,128, 137, 1)",
            },
        },
    });
    return (
        <div
            style={{ minHeight: "calc(100vh - 80px)" }}
            className="d-flex flex-column  justify-content-center align-items-center"
        >
            <div className="" style={{ fontFamily: "Brush Script MT" }}>
                <h1>Register</h1>
            </div>
            <div
                className="container"
                style={{
                    padding: "100px 100px",
                    maxWidth: "800px",
                }}
            >
                <div className="row">
                    <div className=" ">
                        <div className="d-flex flex-column   ">
                            <TextField
                                value={email}
                                onChange={(mail) => {
                                    handleEmail(mail.target.value);
                                }}
                                className="mb-3 "
                                label="Email"
                            ></TextField>
                            <TextField
                                value={password}
                                onChange={(pw) => {
                                    handlePassword(pw.target.value);
                                }}
                                className="mb-3 "
                                label="Password"
                                type="password"
                            ></TextField>
                            {registerError && (
                                <RegisterError
                                    errorMessage={errorMessage}
                                ></RegisterError>
                            )}
                        </div>
                        <div className=" align-self-center ">
                            <div className="d-flex flex-column  ">
                                <ThemeProvider theme={theme}>
                                    <LoadingButton
                                        sx={{
                                            minHeight: 56,
                                        }}
                                        onClick={handleClick}
                                        loading={loading}
                                        loadingPosition="end"
                                        endIcon={<SendIcon />}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </LoadingButton>
                                </ThemeProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
