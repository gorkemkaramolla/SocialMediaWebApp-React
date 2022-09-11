import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  const inputBio = (value) => {
    setWriterInfo((prev) => ({
      ...prev,
      bio: value,
    }));
  };
  const inputUsername = (value) => {
    setWriterInfo((prev) => ({
      ...prev,
      userName: value,
    }));
  };
  const inputEmail = (value) => {
    setWriterInfo((prev) => ({
      ...prev,
      email: value,
    }));
  };
  const { writerId } = useParams();
  return (
    <div>
      <h1>{writerInfo.email}</h1>
      <h1>{writerInfo.bio}</h1>
      <h1>{writerInfo.userName}</h1>
      <div>
        <div>
          <label style={{ width: "80px" }}>email</label>

          <input
            onChange={inputEmail}
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
            onChange={inputBio}
            value={writerInfo.bio}
            style={{ width: "300px" }}
            type="text"
            id="bio"
            defaultValue={writerInfo.bio}
          />
          <button>change</button>
        </div>
        <div>
          <label style={{ width: "80px" }}>username</label>
          <input
            onChange={inputUsername}
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
}
