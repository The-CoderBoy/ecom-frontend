import React, { useEffect, useState } from "react";
import Side from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function AddBanner() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [imageData, setImageData] = useState([]);
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);
  const [delImage, setDelImage] = useState([]);

  useEffect(() => {
    if (cookies.user !== "admin") {
      navigation("/adminLogin");
    } else {
      axios.post(`${process.env.REACT_APP_ENDPOINT}/viewBanner`).then((res) => {
        setData(res.data.images);
      });
    }
  }, []);

  const addImage = (e) => {
    setImageData(e.target.files);
    setImage(e.target.value);
  };

  const submit = async () => {
    const fromData = new FormData();

    for (let x = 0; x < imageData.length; x++) {
      fromData.append("images", imageData[x]);
    }

    await axios
      .post(`${process.env.REACT_APP_ENDPOINT}/addBanner`, fromData)
      .then((res) => {
        if (res.data.msg) {
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
          width: "500px",
          gap: "10px",
          border: "solid 1px black",
          padding: "10px",
          margin: "auto",
          marginTop: "50px",
          borderRadius: "10px",
        }}
      >
        <input
          type="file"
          name="images"
          multiple
          onChange={addImage}
          value={image}
        />
        <button onClick={submit}>Submit</button>
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
          {data.map((item, index) => {
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
                  <input id={index} type="checkbox" value={item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddBanner;
