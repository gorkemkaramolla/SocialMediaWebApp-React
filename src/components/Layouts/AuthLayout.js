import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
