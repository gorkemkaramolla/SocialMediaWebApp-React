import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormHelperText, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";

export default function Writer() {
    const [writerInfo, setWriterInfo] = useState({
        userName: "",
        bio: "",
        email: "",
    });
    let axiosConfig = {
        headers: {
            Authorization: localStorage.getItem("access"),
        },
    };
    useEffect(() => {
        getWriterInformations();
    }, []);
    const getWriterInformations = () => {
        axios
            .get("/writers/" + writerId, axiosConfig)
            .then((response) => {
                console.log(response.data);
                setWriterInfo((prev) => ({
                    ...prev,
                    userName: response.data.userName,

                    bio: response.data.bio,
                    email: response.data.email,
                }));
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const changeHolder = (event) => {
        console.log(event.target.name);
        setWriterInfo((values) => {
            return { ...values, [event.target.name]: event.target.value };
        });
    };
    const { writerId } = useParams();
    if (writerInfo.userName === "") {
        return (
            <div>
                <div>{writerInfo.bio}</div>
                <div>
                    <div>
                        <label style={{ width: "80px" }}>email</label>

                        <input
                            onChange={(e) => {
                                changeHolder(e);
                            }}
                            value={writerInfo.email}
                            style={{ width: "300px" }}
                            type="text"
                            id="email"
                            defaultValue={writerInfo.email}
                        />
                        <button>change</button>
                    </div>
                    <div>
                        <label style={{ width: "80px" }}>bio</label>

                        <input
                            onChange={(e) => {
                                changeHolder(e);
                            }}
                            value={writerInfo.bio}
                            style={{ width: "300px" }}
                            type="text"
                            id="bio"
                            defaultValue={writerInfo.bio}
                        />
                        <button
                            onClick={() => {
                                window.confirm(
                                    "Are you sure you want to continue?"
                                );
                            }}
                        >
                            change
                        </button>
                    </div>
                    <div>
                        <label style={{ width: "80px" }}>username</label>
                        <input
                            onChange={(e) => {
                                changeHolder(e);
                            }}
                            value={writerInfo.userName}
                            style={{ width: "300px" }}
                            type="text"
                            id="userName"
                            defaultValue={writerInfo.userName}
                        />
                        <button>change</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className="d-flex flex-column  justify-content-center align-items-center"
                style={{ minHeight: "calc(100vh - 80px)" }}
            >
                <TextField
                    InputProps={{
                        endAdornment: <Button title="Send"></Button>,
                    }}
                    inputProps={{
                        maxLength: 25,
                    }}
                    sx={{ minWidth: 250 }}
                    label="Username"
                    ador
                ></TextField>

                <FormHelperText>
                    You can pick a username between 3-25 characters long <br />
                    You won't be able to change your username later
                </FormHelperText>
            </div>
        );
    }
}
