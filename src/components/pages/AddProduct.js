import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Side from "../Sidebar";

function AddProduct() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);

  const [data, setData] = useState({
    "product name": "",
    price: "",
    quantity: "",
    discription: "",
  });

  useEffect(() => {
    if (cookies.user !== "admin") {
      navigation("/adminLogin");
    }
  }, []);

  const [imageData, setImageData] = useState([]);
  const [image, setImage] = useState("");

  const addData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addImage = (e) => {
    setImageData(e.target.files);
    setImage(e.target.value);
  };

  const submit = async () => {
    const fromData = new FormData();
    fromData.append("data", JSON.stringify(data));

    for (let x = 0; x < imageData.length; x++) {
      fromData.append("images", imageData[x]);
    }

    await axios
      .post(`${process.env.REACT_APP_ENDPOINT}/addProduct`, fromData)
      .then((res) => {
        if (res.data.msg) {
          setData({
            "product name": "",
            price: "",
            quantity: "",
            discription: "",
          });

          setImageData([]);
          setImage("");
          alert("data saved ");
        }
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Side />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          gap: "10px",
          border: "solid 1px black",
          padding: "10px",
          margin: "auto",
          marginTop: "50px",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          name="product name"
          onChange={addData}
          value={data["product name"]}
          placeholder="product name"
        />
        <input
          type="text"
          name="price"
          onChange={addData}
          value={data.price}
          placeholder="price"
        />
        <input
          type="text"
          name="quantity"
          onChange={addData}
          value={data.quantity}
          placeholder="quantity"
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={addImage}
          value={image}
        />
        <textarea
          cols="30"
          rows="10"
          name="discription"
          onChange={addData}
          value={data.discription}
          placeholder="discription"
        ></textarea>

        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default AddProduct;
