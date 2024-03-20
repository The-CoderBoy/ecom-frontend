import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_ENDPOINT);
    axios.post(`${process.env.REACT_APP_ENDPOINT}/viewProduct`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
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
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item["product name"]}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProduct;
