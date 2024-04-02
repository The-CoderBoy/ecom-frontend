import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import ProductCard from "../ProductCard";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_ENDPOINT}/viewProduct`).then((res) => {
      if (res.data) {
        setData(res.data);
        console.log(res.data);
      }
    });
  }, []);

  return (
    <div>
      <Banner />
      <div
        style={{
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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
