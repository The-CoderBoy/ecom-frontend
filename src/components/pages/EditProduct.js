import axios from "axios";
import React, { useEffect, useState } from "react";

function EditProduct() {
  const [data, setData] = useState({
    "product name": "",
    price: "",
    quantity: "",
    discription: "",
    images: [],
  });

  const [delImage, setDelImage] = useState([]);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = () => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/productDetails`, {
        _id: "65fafdda4b7ce25a61a1ed93",
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  const addData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const delImageHandler = (e) => {
    if (e.target.checked) {
      setDelImage((pre) => {
        if (pre.includes(e.target.value)) {
          return pre;
        } else {
          let newArr = [...pre];
          newArr.push(e.target.value);
          return newArr;
        }
      });
    } else {
      if (delImage.includes(e.target.value)) {
        setDelImage((pre) => {
          let newArr = [...pre].filter((x, i) => {
            if (x !== e.target.value) {
              return x;
            }
          });
          return newArr;
        });
      }
    }
  };

  const sendData = async () => {
    let productData = {};

    if (delImage.length) {
      let images = data.images.filter((item) => {
        if (!delImage.includes(item)) {
          return item;
        }
      });

      productData = { ...data, images };

      axios.post(`${process.env.REACT_APP_ENDPOINT}/updateProduct`, {
        productData: { ...data, images },
        delImage,
      });
    } else {
      productData = data;
    }

    await axios
      .post(`${process.env.REACT_APP_ENDPOINT}/updateProduct`, {
        productData,
        delImage,
      })
      .then((res) => {
        if (res.data.msg) {
          apiCall();
        }
      });
  };

  return (
    <div
      style={{
        margin: "auto",
        border: "solid 1px black",
        display: "flex",
        flexDirection: "column",
        width: "60%",
        marginTop: "50px",
        padding: "10px",
        borderRadius: "10px",
        gap: "10px",
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

      <textarea
        cols="30"
        rows="10"
        name="discription"
        onChange={addData}
        value={data.discription}
        placeholder="discription"
      ></textarea>

      <hr style={{ width: "100%" }} />

      <div
        style={{
          margin: "auto",
          width: "97%",
          display: "flex",
          gap: "20px",
          overflowX: "scroll",
          padding: "10px",
          border: "solid 1px black",
        }}
      >
        {data.images.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={`${process.env.REACT_APP_ENDPOINT}/image/${item}`}
                alt=""
                width={200}
                height={200}
              />
              <div>
                <label htmlFor={index}>Delete</label>
                <input
                  id={index}
                  type="checkbox"
                  value={item}
                  onChange={delImageHandler}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button style={{ width: "200px" }} onClick={sendData}>
        Save Changes
      </button>
    </div>
  );
}

export default EditProduct;
