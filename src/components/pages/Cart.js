import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Cart() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [check, setCheck] = useState("");

  const [data, setData] = useState([]);

  const apiCall = () => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/viewCart`, {
        _id: cookies.user,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.productDetails);
      });
  };

  useEffect(() => {
    if (cookies.user?.length && cookies.user != "admin") {
      apiCall();
    } else {
      navigation("/userLogin");
    }
  }, []);

  const deleteItem = (productId) => {
    console.log("first");
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/deleteCartItem`, {
        _id: cookies.user,
        productId: productId,
      })
      .then((res) => {
        if (res.data?.msg) {
          setData([]);
          apiCall();
        }
      });
  };

  const quantityHandler = (e, index) => {
    if (e.target.value > 0) {
      setData((pre) => {
        let newArr = [...pre];

        newArr[index].quantity = e.target.value;

        return newArr;
      });
      setCheck(e.target.value);
    }
  };

  useEffect(() => {
    if (check.length) {
      const checkInput = setTimeout(() => {
        axios
          .post(`${process.env.REACT_APP_ENDPOINT}/updateCart`, {
            _id: cookies.user,
            productDetails: data,
          })
          .then((res) => {
            if (res.data.msg) {
              setData([]);
              apiCall();
              setCheck("");
            }
          });
      }, 1000);
      return () => clearTimeout(checkInput);
    }
  }, [check]);

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
                onChange={(e) => {
                  quantityHandler(e, index);
                }}
              />
            </div>
            <button
              style={{ marginTop: "10px" }}
              onClick={() => {
                deleteItem(item.productId);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
