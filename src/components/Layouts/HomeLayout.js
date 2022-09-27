import React from "react";
import { Outlet, Link } from "react-router-dom";
import NavbarComponent from "../Navbar/NavBarComponent";

export const HomeLayout = () => {
  if (localStorage.getItem("user") !== null) {
    return (
      <div>
        <NavbarComponent></NavbarComponent>
        <Outlet></Outlet>
      </div>
    );
  } else {
    return (
      <div>
        <h2>GİRİŞ YAPINIZ</h2>
        <div style={{ display: "flex", gap: "20px 15px" }}>
          <Link to={"auth/login"}>Login</Link>
          <Link to={"auth/register"}>Register</Link>
        </div>
      </div>
    );
  }
};
