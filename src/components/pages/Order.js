import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Side from "../Sidebar";

function Order() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [data, setData] = useState([]);

  const apiCall = () => {
    axios.post(`${process.env.REACT_APP_ENDPOINT}/viewOrder`).then((res) => {
      if (res.data) {
        setData(res.data.reverse());
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    if (cookies.user !== "admin") {
      navigation("/adminLogin");
    } else {
      apiCall();
    }
  }, []);

  const updateOrder = (e, _id, index) => {
    console.log(e.target.value, _id);

    setData((pre) => {
      let newArr = [...pre];
      newArr[index].orderStatus = e.target.value;
      return newArr;
    });

    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/updateOrder`, {
        _id: _id,
        orderStatus: e.target.value,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

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
                  <td>
                    <select
                      onChange={(e) => {
                        updateOrder(e, item._id, index);
                      }}
                      value={item.orderStatus}
                    >
                      <option value="Pending">Prending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
