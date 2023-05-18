import React, { useContext, useEffect, useState } from "react";
import ChefLogo1 from "../assets/logo1.svg";
import Icon from "../assets/hamburger.svg";

import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div id="navbaractive">
      <div id="logo">
        <img height="20px" src={ChefLogo1} alt="logo" />
        <Link className="link" to="/">
          RECIPEZ.
        </Link>
      </div>
      <div id="hamburger">
        <img
          height="30px"
          src={Icon}
          onClick={() => {
            setActive(!active);
          }}
        />
      </div>
      <div id={active ? "contentactive" : "content"}>
        <NavLink
          style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
            };
          }}
          to="/"
        >
          <div>Home</div>
        </NavLink>
        <NavLink
          style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
            };
          }}
          to="/recipe"
        >
          <div>Recipes</div>
        </NavLink>
        <NavLink
          style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
            };
          }}
          to="/about"
        >
          <div>About</div>
        </NavLink>
        <NavLink
          style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
            };
          }}
          to="/profile"
        >
          <div>Profile</div>
        </NavLink>
        <div className="trial">
          {user && (
            <button onClick={handleLogout} className="signupactive">
              <div>LOG OUT</div> <div>{user.name}</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
