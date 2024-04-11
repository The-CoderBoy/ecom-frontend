import React, { useEffect, useState, useContext } from "react";
import { Navbar } from "responsive-navbar-react";
import "responsive-navbar-react/dist/index.css";
import { IoCartOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartProvider } from "./Provider";
import { IoIosSearch } from "react-icons/io";

function Nav() {
  const { checkCart } = useContext(CartProvider);
  const navigation = useNavigate();
  const [item, setItem] = useState(0);
  const [cookies, setCookie] = useCookies(["user"]);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    if (cookies.user?.length && cookies.user != "admin") {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/viewCart`, {
          _id: cookies.user,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setItem(res.data.productDetails.length);
          }
        });
    } else {
      setItem(0);
    }
  }, [checkCart]);

  const props = {
    items: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Admin Login",
        link: "/adminLogin",
      },
      {
        text: "Login",
        link: "/userLogin",
      },
    ],
    logo: {
      text: "E-commerce",
    },
    style: {
      barStyles: {
        background: "#444",
      },
      sidebarStyles: {
        background: "#222",
        buttonColor: "white",
      },
    },
  };

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_ENDPOINT}/viewProduct`).then((res) => {
      if (res.data) {
        setData(res.data);
        console.log(res.data);
      }
    });
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <Navbar {...props} />
        <div
          style={{
            position: "absolute",
            fontSize: "30px",
            backgroundColor: "white",
            borderRadius: "40%",
            padding: "5px",
            paddingTop: "8px",
            zIndex: 0,
            right: "3px",
          }}
        >
          <IoCartOutline />
        </div>
        <div
          style={{
            position: "absolute",
            right: "15px",
            zIndex: 1,
            color: "white",
            backgroundColor: "black",
            padding: "2px",
            borderRadius: "50%",
            marginTop: "3px",
          }}
          onClick={() => {
            navigation("/cart");
          }}
        >
          {item}
        </div>
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <input
            type="text"
            style={{ width: "300px", height: "25px" }}
            list="search"
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
          />
          <datalist id="search">
            {data.map((item, index) => {
              return (
                <option value={item["product name"]} key={index}>
                  {item["product name"]}
                </option>
              );
            })}
          </datalist>
          <button
            style={{ height: "30px" }}
            onClick={() => {
              if (searchData.length) {
                navigation(`/SearchProduct/${searchData}`);
              }
            }}
          >
            <IoIosSearch />
          </button>
        </div>
      </div>
    </>
  );
}

export default Nav;
