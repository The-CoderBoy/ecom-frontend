import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function EditProduct() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const { _id } = useParams();

  const [data, setData] = useState({
    "product name": "",
    price: "",
    quantity: "",
    discription: "",
    images: [],
  });

  const [delImage, setDelImage] = useState([]);

  const [imageData, setImageData] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (cookies.user == "admin") {
      apiCall();
    } else {
      navigation("/adminLogin");
    }
  }, []);

  const apiCall = () => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/productDetails`, {
        _id: _id,
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

  const addImage = (e) => {
    setImageData(e.target.files);
    setImage(e.target.value);
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
          setData({
            "product name": "",
            price: "",
            quantity: "",
            discription: "",
            images: [],
          });
          apiCall();
          setDelImage([]);
          setImageData([]);
          setImage("");
        }
      });
  };

  const sendImageData = async () => {
    const formData = new FormData();

    formData.append("_id", _id);

    for (let x = 0; x < imageData.length; x++) {
      formData.append("images", imageData[x]);
    }

    await axios
      .post(`${process.env.REACT_APP_ENDPOINT}/addImages`, formData)
      .then((res) => {
        if (res.data.msg) {
          apiCall();
          setDelImage([]);
          setImageData([]);
          setImage("");
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
        marginTop: "30px",
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

      <hr style={{ width: "100%" }} />

      <h4 style={{ margin: "0px" }}>Add New Images</h4>

      <input
        type="file"
        name="images"
        multiple
        onChange={addImage}
        value={image}
      />

      <button style={{ width: "200px" }} onClick={sendImageData}>
        Save Images
      </button>
    </div>
  );
}

export default EditProduct;
