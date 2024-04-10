import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Side from "../Sidebar";

function UserOrder() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [data, setData] = useState([]);

  const apiCall = () => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/viewUserOrder`, {
        _id: cookies.user,
      })
      .then((res) => {
        if (res.data) {
          setData(res.data.reverse());
          console.log(res.data);
        }
      });
  };

  useEffect(() => {
    if (cookies.user?.length && cookies.user !== "admin") {
      apiCall();
    } else {
      navigation("/userLogin");
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <Side />
      <div
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "20px",
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>User Name</th>
              <th>Contact No</th>
              <th>Address</th>
              <th>Total Price</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.date}</td>
                  <td>{item.userName}</td>
                  <td>{item.ContactNo}</td>
                  <td>{item.address}</td>
                  <td>{+item.price * +item.quantity}</td>
                  <td>{item.orderStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserOrder;
