import React, { useEffect, useState } from "react";
import "./RecipeBig.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function RecipeBig() {
  const location = useLocation();
  const [data, setData] = useState({});
  const appID = import.meta.env.VITE_API;

  const id = location.state.id;
  const fetchData = async () => {
    try {
      const newData = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?stepBreakdown=true&apiKey=${appID}`
      );
      setData(newData.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div id="recipe--main">
      <div id="recipe--left">
        <div id="recipe--head">{location.state.name}</div>
        <div
          style={{
            fontSize: "1.2em",
            margin: "8px 0",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          Directions
        </div>
        <div id="instructions">
          {data[0]?.steps.map((item) => (
            <div className="instr--steps" key={item.number}>
              <div className="instr--num">Step {item.number}</div>
              {item.step}
            </div>
          ))}
        </div>
      </div>
      <div id="recipe--right">
        <div id="recipe--img">
          <img src={location.state.image} />
        </div>
        <div id="recipe--ingr">
          <div id="recipe--subhead">Ingredients</div>
          <ul>
            {location.state.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
