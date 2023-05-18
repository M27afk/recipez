import React from "react";
import Github from "../assets/github.svg";
import Twitter from "../assets/twitter.svg";
import Linkedin from "../assets/linkedin.svg";

import "./Footer.css";
export default function Footer() {
  return (
    <div id="footer">
      <div id="footIcons">
        <a href="https://www.github.com/m27afk">
          <img src={Github} alt="GitHub" />
        </a>
        <a href="https://www.twitter.com/manushreshta27">
          <img src={Twitter} alt="Twitter" />
        </a>
        <a href="https://www.linkedin.com/in/manushreshta">
          <img src={Linkedin} alt="Linkedin" />
        </a>
      </div>
      <div id="footDetails">
        Recipez. Copyright &#169; 2023 - Designed with &#9829; by Manushreshta
      </div>
    </div>
  );
}
