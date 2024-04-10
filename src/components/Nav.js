import React, { useEffect, useState, useContext } from "react";
import { Navbar } from "responsive-navbar-react";
import "responsive-navbar-react/dist/index.css";
import { IoCartOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartProvider } from "./Provider";

function Nav() {
  const { checkCart } = useContext(CartProvider);

  const navigation = useNavigate();
  const [item, setItem] = useState(0);
  const [cookies, setCookie] = useCookies(["user"]);

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
      </div>
    </>
  );
}

export default Nav;
