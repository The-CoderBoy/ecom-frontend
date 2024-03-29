import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
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
      .post(`${process.env.REACT_APP_ENDPOINT}/adminLogin`, data)
      .then((res) => {
        if (res.data.msg) {
          console.log("hello");
          setCookie("user", "admin");
          navigation("/viewProduct");
        } else {
          setCookie("user", "");
        }
      });
  };

  useEffect(() => {
    if (cookies.user == "admin") {
      navigation("/viewProduct");
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
    </div>
  );
}

export default AdminLogin;
