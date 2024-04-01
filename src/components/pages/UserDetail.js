import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import UserSidebar from "../UserSidebar";

function UserDetail() {
  const [cookies, setCookie] = useCookies(["user"]);

  const [data, setData] = useState({
    userName: "",
    password: "",
    contactNo: "",
    address: "",
  });

  const inputContact = useRef();

  const dataHandler = (e) => {
    if (e.target.name == "contactNo") {
      e.target.value.length < 10
        ? (inputContact.current.style.color = "red")
        : (inputContact.current.style.color = "black");

      setData({ ...data, contactNo: e.target.value });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const sendData = () => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/updateUser`, data)
      .then((res) => {
        if (res.data.msg) {
          apiCall();
        }
      });
  };

  const apiCall = () => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/userDetail`, {
        userName: cookies.user,
      })
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <UserSidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          gap: "10px",
          border: "solid 1px black",
          padding: "10px",
          margin: "auto",
          marginTop: "50px",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          onChange={dataHandler}
          value={data.userName}
          disabled
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={dataHandler}
          value={data.password}
        />
        <input
          type="number"
          name="contactNo"
          placeholder="Contact No"
          ref={inputContact}
          onChange={dataHandler}
          value={data.contactNo}
        />
        <textarea
          cols="30"
          rows="10"
          name="address"
          placeholder="Address"
          onChange={dataHandler}
          value={data.address}
        ></textarea>
        <button onClick={sendData}>Update Detail</button>
      </div>
    </div>
  );
}

export default UserDetail;
