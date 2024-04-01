import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function UserSidebar() {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        minHeight: "400px",
        backgroundColor: "white",
      }}
    >
      <Sidebar collapsed={collapsed} transitionDuration={1000}>
        <Menu>
          <MenuItem component={<Link to="/userDetail" />}>
            User Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCookie("user", "");
              navigation("/userLogin");
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10 }}>
        <div>
          <div
            style={{ fontSize: "40px" }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <IoMdClose /> : <IoIosMenu />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserSidebar;
