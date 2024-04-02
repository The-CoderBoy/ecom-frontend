import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";

function ProductPage() {
  const [data, setData] = useState({
    "product name": "",
    price: "",
    quantity: "",
    discription: "",
    images: [],
  });
  const { _id } = useParams();

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
          <button>Buy</button>
          <button>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
