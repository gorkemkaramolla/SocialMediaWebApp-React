import { React, useState, useReducer } from "react";
import { FormHelperText, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginReducer, INITIAL_STATE } from "./loginReducer/LoginReducers";
import { ACTION_TYPES } from "./loginReducer/loginActionTypes";
import RegisterAlert from "../Errors/RegisterAlert";
export default function Login() {
    let history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);

    const handleEmail = (email) => {
        setEmail(email);
    };
    const handlePassword = (pw) => {
        setPassword(pw);
    };
    const submitForm = () => {
        axios
            .post("/auth/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                dispatch({
                    type: ACTION_TYPES.success,
                    payload: response.data,
                });
                localStorage.setItem("user", response.data.writerId);
                localStorage.setItem("access", response.data.accessToken);
                localStorage.setItem("userName", response.data.userName);
                history("/home", { replace: true });
            })
            .catch((error) => {
                localStorage.clear();
                dispatch({
                    type: ACTION_TYPES.error,
                    payload: error.message,
                });
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
                <h1>Login</h1>
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
                                onChange={(e) => {
                                    handleEmail(e.target.value);
                                }}
                                className="mb-3 "
                                label="Email"
                            ></TextField>
                            <TextField
                                value={password}
                                onChange={(e) => {
                                    handlePassword(e.target.value);
                                }}
                                className="mb-3 "
                                label="Password"
                                type="password"
                            ></TextField>
                        </div>
                        <div className=" align-self-center ">
                            <div className="d-flex flex-column  ">
                                <ThemeProvider theme={theme}>
                                    <LoadingButton
                                        sx={{
                                            minHeight: 56,
                                            marginBottom: "10px",
                                        }}
                                        loadingPosition="end"
                                        endIcon={<SendIcon />}
                                        variant="contained"
                                        color="primary"
                                        onClick={submitForm}
                                    >
                                        Submit
                                    </LoadingButton>
                                    {state.error === true ? (
                                        <RegisterAlert
                                            infoMessage="Your Email or Password is Wrong"
                                            header="Authorization Failed"
                                            type="danger"
                                        ></RegisterAlert>
                                    ) : null}
                                    <div className="d-flex justify-content-start">
                                        <FormHelperText
                                            sx={{
                                                backgroundColor:
                                                    "rgba(237,239,241,255)",
                                                fontSize: "16px",
                                                color: "black",
                                            }}
                                        >
                                            Don't you have an account?
                                            <Link
                                                style={{
                                                    color: "#0095f6",
                                                }}
                                                className="nav-link"
                                                to="/register"
                                            >
                                                Go to Register
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
