import React from "react";
import { FormHelperText, TextField, InputAdornment } from "@mui/material";
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
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Register() {
  let history = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [IsPasswordVisible, setIspasswordVisible] = useState(false);

  const EMAIL_PATTERN = RegExp(
    "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
      "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
  );
  const PASSWORD_PATTERN = RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$");

  useEffect(() => {}, [registerError.error]);

  const handlePasswordEye = () => {
    setIspasswordVisible(!IsPasswordVisible);
  };

  const handleRegisterRequest = (email, password, setSubmitting) => {
    axios
      .post("/auth/register", {
        email: email,
        password: password,
      })
      .then((response) => {
        setRegisterError(false);
        setRegisterSuccess(true);

        setLoading(false);
        setSubmitting(false);
      })
      .catch((error) => {
        setRegisterSuccess(false);
        setRegisterError(true);
        setErrorMessage(error.response.data);

        setLoading(false);
        setSubmitting(false);
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
      .min(8, "Your password should be of minimum 8 characters length.")
      .max(32, "Your password should be of maximum 32 characters length.")
      .matches(
        /[a-z]+/,
        "Your password should contain at least one uppercase character."
      )
      .matches(
        /[A-Z]+/,
        "Your password should contain at least one uppercase character."
      )
      .matches(/\d+/, "Your password should contain at least one number.")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleRegisterRequest(values.email, values.password, setSubmitting);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        style={{ minHeight: "calc(100vh - 80px)" }}
        className="d-flex flex-column  justify-content-center align-items-center"
      >
        <div className="" style={{ fontFamily: "didot", fontStyle: "italic" }}>
          <h1 style={{ color: "#9B2335" }}>Register</h1>
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
                  sx={{
                    background: "rgba(236,239,242,255)",
                  }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  className="mb-3 "
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  disabled={formik.isSubmitting === true ? true : false}
                ></TextField>
                <TextField
                  sx={{ background: "rgba(236,239,242,255)" }}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
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
                  disabled={formik.isSubmitting === true ? true : false}
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
                      sx={{
                        minHeight: 56,
                      }}
                      type="submit"
                      loading={loading}
                      loadingPosition="end"
                      endIcon={<SendIcon />}
                      variant="contained"
                      color="primary"
                      disabled={formik.isSubmitting === true ? true : false}
                    >
                      Submit
                    </LoadingButton>

                    <div className="d-flex justify-content-start">
                      <FormHelperText
                        sx={{
                          backgroundColor: "rgba(237,239,241,255)",
                          fontSize: "16px",
                          color: "black",
                          paddingTop: "20px",
                        }}
                      >
                        Do you have an account?
                        <Link
                          style={{
                            color: "#0095f6",
                          }}
                          className="nav-link"
                          to="/auth/login"
                        >
                          Log in
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
