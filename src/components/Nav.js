import React from "react";
import { Navbar } from "responsive-navbar-react";
import "responsive-navbar-react/dist/index.css";

function Nav() {
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

  return <Navbar {...props} />;
}

export default Nav;
