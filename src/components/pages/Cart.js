import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [check, setCheck] = useState("");

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
    <div>
      <div
        style={{
          margin: "auto",
          width: "400px",
          marginTop: "20px",
          border: "solid 1px black",
          borderRadius: "10px",
          padding: "10px",
          height: "70vh",
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
              <p>
                Product Name :{" "}
                <Link to={`/productPage/${item.productId}`}>
                  {item.productName}
                </Link>
              </p>
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
              <p>Total Price : {+item.price * +item.quantity}</p>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "300px",
          margin: "auto",
        }}
      >
        <p>Grand Price : {total}</p>
        <div>
          <button
            style={{ marginTop: "15px" }}
            onClick={() => {
              navigation("/checkOutFromCart");
            }}
            disabled={!data.length}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
