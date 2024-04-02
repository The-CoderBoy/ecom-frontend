import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ imageUrl, productName, _id }) {
  const navigation = useNavigate();

  return (
    <div
      style={{
        width: "300px",
        height: "350px",
        border: "1px black solid",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={`${process.env.REACT_APP_ENDPOINT}/image/${imageUrl}`}
        alt=""
        height={250}
        width={250}
      />
      <div style={{ margin: "auto", marginTop: "10px" }}>{productName}</div>
      <button
        style={{ marginTop: "10px" }}
        onClick={() => {
          navigation(`/productPage/${_id}`);
        }}
      >
        View Product
      </button>
    </div>
  );
}

export default ProductCard;
