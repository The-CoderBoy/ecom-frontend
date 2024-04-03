import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Cart() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (cookies.user.length && cookies.user != "admin") {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/viewCart`, {
          _id: cookies.user,
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data.productDetails);
        });
    } else {
      navigation("/userLogin");
    }
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: "400px",
        marginTop: "20px",
        border: "solid 1px black",
        borderRadius: "10px",
        padding: "10px",
        maxHeight: "80vh",
        overflowY: "scroll",
      }}
    >
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              margin: "auto",
              width: "90%",
              border: "solid 1px black",
              borderRadius: "10px",
              marginTop: "10px",
              padding: "10px",
            }}
          >
            <p>Product Name : {item.productName}</p>
            <p>Price : {item.price}</p>
            <div>
              <label>Quatity</label>
              <input
                type="number"
                name={item.productId}
                value={item.quantity}
              />
            </div>
            <button style={{ marginTop: "10px" }}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
