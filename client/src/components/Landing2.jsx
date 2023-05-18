import React from "react";
import CountUp from "react-countup";
import "./Landing2.css";

export default function Landing2() {
  return (
    <div id="maindiv">
      <div className="sub">
        <div className="sub1">
          <CountUp start={1000} end={2000} duration={3} />+
        </div>
        <div className="sub2">Recipes</div>
      </div>
      <div className="sub">
        <div className="sub1">
          <CountUp start={500} end={1000} duration={3} />+
        </div>
        <div className="sub2">Ingredients</div>
      </div>
      <div className="sub">
        <div className="sub1">
          <CountUp start={0} end={50} duration={3} />+
        </div>
        <div className="sub2">Users</div>
      </div>
    </div>
  );
}
