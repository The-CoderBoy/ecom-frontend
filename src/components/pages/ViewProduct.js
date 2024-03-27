import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Side from "../Sidebar";

function ViewProduct() {
  const navigation = useNavigate();

  const [data, setData] = useState([]);
  const [check, setCheck] = useState(true);
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.user == "admin") {
      console.log(process.env.REACT_APP_ENDPOINT);
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/viewProduct`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        });
    } else {
      navigation("/adminLogin");
    }
  }, [check]);

  useEffect(() => {
    console.log(cookies);
  }, []);

  const deleteProduct = (_id) => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/deleteProduct`, { _id })
      .then((res) => {
        if (res.data.msg) {
          setCheck(!check);
        }
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Side />
      <div
        style={{
          width: "90%",
          height: "80vh",
          border: "1px solid black",
          margin: "auto",
          marginTop: "50px",
          overflowY: "scroll",
        }}
      >
        <table style={{ width: "100%", textAlign: "center" }}>
          <thead>
            <th>Product Name</th>
            <th>Qauntity</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item["product name"]}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigation(`/editProduct/${item._id}`);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteProduct(item._id)}>
                      Delete
                    </button>
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

export default ViewProduct;
