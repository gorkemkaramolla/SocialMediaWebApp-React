import React from "react";
import { FormHelperText, TextField } from "@mui/material";
import { GiTripleYin } from "react-icons/gi";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import { red, orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterAlert from "../Errors/RegisterAlert";
import "./Register.scss";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    let history = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [mailDisabled, setMailDisabled] = useState(true);
    const [pwDisabled, setPwDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const EMAIL_PATTERN = RegExp(
        "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
            "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
    );
    const PASSWORD_PATTERN = RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
    );

    useEffect(() => {}, [registerError.error]);
    function handleClick() {
        setLoading(true);
        handleRegisterRequest();
    }

    const handleMailCredentials = (value) => {
        if (EMAIL_PATTERN.test(value)) {
            setMailDisabled(false);
        } else {
            setMailDisabled(true);
        }
    };
    const handlePwCredentials = (value) => {
        if (PASSWORD_PATTERN.test(value)) {
            setPwDisabled(false);
        } else {
            setPwDisabled(true);
        }
    };
    const handleEmail = (value) => {
        setEmail(value);
    };
    const handlePassword = (value) => {
        setPassword(value);
    };

    const handleRegisterRequest = () => {
        axios
            .post("/auth/register", {
                email: email,
                password: password,
            })
            .then((response) => {
                setRegisterError(false);
                setRegisterSuccess(true);

                setLoading(false);
            })
            .catch((error) => {
                setRegisterSuccess(false);
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
                <h1 style={{ color: "#9B2335" }}>Register</h1>
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
                                onChangeCapture={(mail) => {
                                    handleMailCredentials(mail.target.value);
                                }}
                                className="mb-3 "
                                label="Email"
                            ></TextField>
                            <TextField
                                value={password}
                                onChange={(pw) => {
                                    handlePassword(pw.target.value);
                                }}
                                onChangeCapture={(pw) => {
                                    handlePwCredentials(pw.target.value);
                                }}
                                className="mb-3 "
                                label="Password"
                                type="password"
                            ></TextField>
                            {registerError && (
                                <RegisterAlert
                                    header="Error Recieved"
                                    type={"danger"}
                                    infoMessage={errorMessage.message}
                                ></RegisterAlert>
                            )}
                            {registerSuccess && (
                                <RegisterAlert
                                    header="Successfully registered"
                                    type={"success"}
                                ></RegisterAlert>
                            )}
                        </div>
                        <div className=" align-self-center ">
                            <div className="d-flex flex-column  ">
                                <ThemeProvider theme={theme}>
                                    <LoadingButton
                                        disabled={pwDisabled || mailDisabled}
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

                                    <div className="d-flex justify-content-start">
                                        <FormHelperText
                                            sx={{
                                                backgroundColor:
                                                    "rgba(237,239,241,255)",
                                                fontSize: "16px",
                                                color: "black",
                                            }}
                                        >
                                            Do you already have an account?
                                            <Link
                                                style={{
                                                    color: "#0095f6",
                                                }}
                                                className="nav-link"
                                                to="/"
                                            >
                                                Go to login
                                            </Link>
                                        </FormHelperText>
                                    </div>
                                </ThemeProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
