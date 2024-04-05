import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { useCookies } from "react-cookie";

function ProductPage() {
  const [data, setData] = useState({
    "product name": "",
    price: "",
    quantity: "",
    discription: "",
    images: [],
  });
  const { _id } = useParams();
  const [cookies, setCookie] = useCookies(["user"]);
  const [image, setImage] = useState([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/productDetails`, { _id: _id })
      .then((res) => {
        if (res.data) {
          setData(res.data);

          setImage((pre) => {
            let newArr = [];
            for (let x = 0; x < res.data.images.length; x++) {
              newArr.push({
                original: `${process.env.REACT_APP_ENDPOINT}/image/${res.data.images[x]}`,
                thumbnail: `${process.env.REACT_APP_ENDPOINT}/image/${res.data.images[x]}`,
              });
            }
            return newArr;
          });
        }
      });
  }, []);

  const qtyHandler = (e) => {
    if (e.target.value > 0) {
      setQty(e.target.value);
    }
  };

  const addToCart = () => {
    if (cookies.user?.length && cookies.user != "admin") {
      let cartData = {
        userName: cookies.user,
        productId: _id,
        productName: data["product name"],
        quantity: qty,
        price: data.price,
      };

      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/addToCart`, cartData)
        .then((res) => {
          if (res.data.msg) {
            alert("product added in the cart");
          }
        });
    } else {
      alert("Please Login first");
    }
  };

  const buyNow = () => {
    const result = window.confirm(
      `Product name : ${
        data["product name"]
      } \n Qnatity : ${qty} \n Total Price : ${+qty * +data.price}`
    );

    let orderData = {
      userName: cookies.user,
      productId: data.productId,
      productName: data["product name"],
      price: data.price,
      quantity: qty,
    };

    if (result) {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/buyNow`, orderData)
        .then((res) => {
          console.log(res.data);
          if (res.data.msg) {
            setQty(1);
            alert("order placed");
          }
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginTop: "20px",
        gap: "10px",
      }}
    >
      <div>
        <ImageGallery items={image} autoPlay={true} slideInterval={1500} />
      </div>
      <div>
        <p>Product Name : {data["product name"]}</p>
        <p>Price : {data.price}</p>
        <p>Discription : {data.discription}</p>
        <div>
          <label>quantity</label>
          <input type="number" value={qty} onChange={qtyHandler} />
        </div>
        <p>Total Price : {+data.price * +qty}</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={buyNow}>Buy</button>
          <button onClick={addToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
