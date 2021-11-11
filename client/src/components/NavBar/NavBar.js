import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="create">Create</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Navbar;
