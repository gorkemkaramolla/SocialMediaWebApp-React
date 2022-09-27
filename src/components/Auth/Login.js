import { React, useState, useReducer } from "react";
import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginReducer, INITIAL_STATE } from "./loginReducer/LoginReducers";
import { ACTION_TYPES } from "./loginReducer/loginActionTypes";
import RegisterAlert from "../Errors/RegisterAlert";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export default function Login() {
  let history = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [IsPasswordVisible, setIspasswordVisible] = useState(false);
  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);
  const handlePasswordEye = () => {
    setIspasswordVisible(!IsPasswordVisible);
  };
  const handleInputs = (event) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitForm = () => {
    axios
      .post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
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

  const eyeIconCss = {
    color: "red",
  };
  return (
    <div
      style={{ minHeight: "calc(100vh - 80px)" }}
      className="d-flex flex-column  justify-content-center align-items-center"
    >
      <div className="" style={{ fontFamily: "didot", fontStyle: "italic" }}>
        <h1>Login</h1>
      </div>
      <div
        className="container"
        style={{
          padding: "4em 6em",

          maxWidth: "800px",
        }}
      >
        <div className="row">
          <div className=" ">
            <div className="d-flex flex-column   ">
              <TextField
                sx={{ background: "rgba(236,239,242,255)" }}
                value={credentials.email}
                name="email"
                onChange={handleInputs}
                className="mb-3 "
                label="Email"
              ></TextField>
              <TextField
                sx={{ background: "rgba(236,239,242,255)" }}
                value={credentials.password}
                name="password"
                onChange={handleInputs}
                className="mb-3 "
                label="Password"
                type={IsPasswordVisible ? null : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      onClick={handlePasswordEye}
                      position="end"
                      component="div"
                      style={{ paddingLeft: "-14px", cursor: "pointer" }}
                    >
                      {IsPasswordVisible ? (
                        <FaEyeSlash style={{ color: "#4169E1 " }} />
                      ) : (
                        <FaEye />
                      )}
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </div>
            <div className=" align-self-center ">
              <div className="d-flex flex-column  ">
                <ThemeProvider theme={theme}>
                  <LoadingButton
                    sx={{
                      minHeight: 56,
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
                        backgroundColor: "rgba(237,239,241,255)",
                        fontSize: "16px",
                        color: "black",
                        paddingTop: "20px",
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
  );
}
