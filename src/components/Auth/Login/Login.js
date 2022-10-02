import { React, useState, useReducer, useEffect } from "react";
import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";
import { loginReducer, INITIAL_STATE } from "./loginReducer/LoginReducers";
import { ACTION_TYPES } from "./loginReducer/loginActionTypes";
import RegisterAlert from "../../Errors/ErrorPages/Auth/RegisterAlert";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
export default function Login() {
    const [random, setRandom] = useState(0);

    let history = useNavigate();
    const [IsPasswordVisible, setIspasswordVisible] = useState(false);
    const [blurred, setBlurred] = useState({
        emailBlur: false,
        passwordBlur: false,
    });
    const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);
    const [errorState, setErrorState] = useState(false);
    const handlePasswordEye = () => {
        setIspasswordVisible(!IsPasswordVisible);
    };

    useEffect(() => {
        setErrorState(state.error.isError);
    }, [state.error]);

    const submitForm = (email, password, setSubmitting) => {
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
                setSubmitting(false);
                setRandom(Math.random());
            })
            .catch((error) => {
                localStorage.clear();
                dispatch({
                    type: ACTION_TYPES.error,
                    payload: error.message,
                });
                setSubmitting(false);
                setRandom(Math.random());
            });
    };
    const theme = createTheme({
        palette: {
            primary: {
                main: "rgba(199,128, 137, 1)",
            },
        },
    });

    const validationSchema = yup.object({
        email: yup
            .string("Enter your email")
            .email("Enter a valid email")
            .required("Email is required"),
        password: yup
            .string("Enter your password")

            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            submitForm(values.email, values.password, setSubmitting);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="login">
                <div className="header">
                    <h1>Login</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="wrapper">
                            <div className="text-field-wrapper">
                                <TextField
                                    className="field-text mb-3"
                                    disabled={
                                        formik.isSubmitting === true
                                            ? true
                                            : false
                                    }
                                    value={formik.values.email}
                                    name="email"
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.email &&
                                        blurred.emailBlur === true &&
                                        Boolean(formik.errors.email)
                                    }
                                    helperText={
                                        formik.touched.email &&
                                        blurred.emailBlur === true &&
                                        formik.errors.email
                                    }
                                    onBlur={() => {
                                        setBlurred((prev) => ({
                                            ...prev,
                                            emailBlur: true,
                                        }));
                                    }}
                                    onFocus={() => {
                                        setBlurred((prev) => ({
                                            ...prev,
                                            emailBlur: false,
                                        }));
                                    }}
                                    label="Email"
                                ></TextField>
                                <TextField
                                    className="field-text mb-3"
                                    name="password"
                                    label="Password"
                                    type={IsPasswordVisible ? null : "password"}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.password &&
                                        blurred.passwordBlur === true &&
                                        Boolean(formik.errors.email)
                                    }
                                    helperText={
                                        formik.touched.password &&
                                        blurred.passwordBlur === true &&
                                        formik.errors.email
                                    }
                                    onBlur={() => {
                                        setBlurred((prev) => ({
                                            ...prev,
                                            passwordBlur: true,
                                        }));
                                    }}
                                    onFocus={() => {
                                        setBlurred((prev) => ({
                                            ...prev,
                                            passwordBlur: false,
                                        }));
                                    }}
                                    disabled={
                                        formik.isSubmitting === true
                                            ? true
                                            : false
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                className="eye-adornment"
                                                onClick={handlePasswordEye}
                                                position="end"
                                                component="div"
                                            >
                                                {IsPasswordVisible ? (
                                                    <FaEyeSlash className="eye-icon" />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                ></TextField>
                            </div>
                            <div className="container-button">
                                <div className="container-button-wrapper">
                                    <ThemeProvider theme={theme}>
                                        <LoadingButton
                                            className="loading-button"
                                            type="submit"
                                            loadingPosition="end"
                                            endIcon={<SendIcon />}
                                            variant="contained"
                                            color="primary"
                                            disabled={
                                                formik.isSubmitting === true
                                                    ? true
                                                    : false
                                            }
                                        >
                                            Submit
                                        </LoadingButton>
                                        {errorState === true ? (
                                            <RegisterAlert
                                                key={random}
                                                infoMessage="Your Email or Password is Wrong"
                                                header="Authorization Failed"
                                                type="danger"
                                            ></RegisterAlert>
                                        ) : null}
                                        <div className="helper-text-container">
                                            <FormHelperText className="form-helper-text">
                                                Don't you have an account?
                                                <Link
                                                    className="nav-link"
                                                    to="/auth/register"
                                                >
                                                    Sign up
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
        </form>
    );
}
