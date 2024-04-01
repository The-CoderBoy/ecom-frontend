import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";

function Banner() {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(450);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_ENDPOINT}/viewBanner`).then((res) => {
      if (res.data) {
        console.log(res.data);
        setData(res.data.images);
      }
    });
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 400) {
      setWidth(300);
    } else {
      setWidth(450);
    }
  };

  // Effect to add event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
      <Carousel
        showThumbs={false}
        interval={1000}
        infiniteLoop={true}
        autoPlay={true}
      >
        {data.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={`${process.env.REACT_APP_ENDPOINT}/image/${item}`}
                height={width}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Banner;
