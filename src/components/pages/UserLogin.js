import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigation = useNavigate();

  const [data, setData] = useState({
    userName: "",
    password: "",
  });

  const [cookies, setCookie] = useCookies(["user"]);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendData = () => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/userLogin`, data)
      .then((res) => {
        if (res.data) {
          setCookie("user", data.userName);
          navigation("/userDetail");
        } else {
          alert("Wrong username or password");
          setData({
            userName: "",
            password: "",
          });
        }
      });
  };

  useEffect(() => {
    if (cookies.user.length && cookies.user != "admin") {
      navigation("/userDetail");
    }
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        border: "solid 1px black",
        padding: "10px",
        borderRadius: "10px",
        marginTop: "50px",
        gap: "10px",
      }}
    >
      <input
        type="text"
        name="userName"
        placeholder="User Name"
        value={data.userName}
        onChange={dataHandler}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={dataHandler}
      />
      <button onClick={sendData}>LogIn</button>

      <hr style={{ width: "100%" }} />
      <button
        onClick={() => {
          navigation("/signUp");
        }}
      >
        Sign In
      </button>
    </div>
  );
}

export default UserLogin;
