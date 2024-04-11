import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductCard";

function SearchProduct() {
  const { product } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/searchProduct`, { product })
      .then((res) => {
        if (res.data) {
          setData(res.data);
          console.log(res.data);
        }
      });
  }, [product]);

  const lh = () => {
    setData((pre) => {
      let newArr = [...pre].sort((a, b) => {
        return a.price - b.price;
      });
      return newArr;
    });
  };

  const hl = () => {
    setData((pre) => {
      let newArr = [...pre].sort((a, b) => {
        return b.price - a.price;
      });
      return newArr;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div style={{ width: "300px" }}>
        <button onClick={lh}>Low To High</button>
        <button onClick={hl}>High To Low</button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        {data.map((item, index) => {
          return (
            <div key={index}>
              <ProductCard
                imageUrl={item.images[0]}
                productName={item["product name"]}
                _id={item._id}
                price={item.price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchProduct;
