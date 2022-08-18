import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  let writerId = 5;
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to={{ pathname: "/writers/" + writerId }}> Writer</Link>
      </li>
    </ul>
  );
}
