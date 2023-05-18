import React from "react";
import Icon from "../assets/trial.jpg";
import "./Landing1.css";
import { Link } from "react-router-dom";

export default function Landing1() {
  return (
    <div id="main">
      <div id="left">
        <div id="heading">Fun and Easy to find the Recipe you want</div>
        <div>Just list your ingredients and get going!</div>
        <div>
          <Link className="link" to="/recipe">
            <button style={{ padding: "10px 15px" }}>Explore Now</button>
          </Link>
        </div>
      </div>
      <div id="right">
        <img src={Icon} title="Instagram: @trvsy" />
      </div>
    </div>
  );
}
