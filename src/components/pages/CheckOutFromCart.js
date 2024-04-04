import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

function CheckOutFromCart() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState("");

  const apiCall = () => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/viewCart`, {
        _id: cookies.user,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.productDetails);
        setTotal((pre) => {
          let price = 0;
          let arr = res.data.productDetails;
          for (let x = 0; x < arr.length; x++) {
            price = +price + +arr[x].price * +arr[x].quantity;
          }

          return price;
        });
      });
  };

  useEffect(() => {
    if (cookies.user?.length && cookies.user != "admin") {
      apiCall();
    } else {
      navigation("/userLogin");
    }
  }, []);

  const sendData = () => {
    let orderData = {
      userName: cookies.user,
      data: data,
    };

    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/orderFromCart`, orderData)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          navigation("/cart");
        }
      });
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "400px",
        marginTop: "20px",
        border: "solid 1px black",
        borderRadius: "10px",
        padding: "10px",
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
            <p>
              Product Name :{" "}
              <Link to={`/productPage/${item.productId}`}>
                {item.productName}
              </Link>
            </p>
            <p>Price : {item.price}</p>
            <p>Quatity : {item.quantity}</p>
            <p>Total Price : {+item.price * +item.quantity}</p>
          </div>
        );
      })}
      <p>Grand Price : {total}</p>
      <button onClick={sendData}>Buy Now</button>
    </div>
  );
}

export default CheckOutFromCart;
