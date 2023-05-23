import React, { useEffect, useState } from "react";
import SearchIcon from "../assets/searchicon.svg";
import axios from "axios";
import "./Recipemain.css";
import Card from "./Card";
import { staticData } from "../assets/staticData";

export default function RecipeMain() {
  const [query, setQuery] = useState(
    JSON.parse(window.localStorage.getItem("query")) || " "
  );

  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const appID = import.meta.env.VITE_API;

  const fetchData = async () => {
    window.localStorage.setItem("query", JSON.stringify(query));

    try {
      const newData = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&limitLicense=true&ranking=1&ignorePantry=true&apiKey=${appID}`
      );
      if (query === " ") setLoading(false);
      else setLoading(true);
      setResponse(newData.data);
    } catch (err) {
      console.log(err.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div id="recipemain">
      <div id="search">
        <input
          type="text"
          placeholder="Tomato,Carrot,Rice"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchData();
            }
          }}
        />
        <span id="searchicon">
          <img src={SearchIcon} onClick={fetchData} />
        </span>
      </div>
      <div id="cards-area">
        {!loading ? (
          staticData.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.title}
              usedIngredients={item.usedIngredients}
              missedIngredients={item.missedIngredients}
              ingredients={item.usedIngredients.slice(0, 3)}
              image={item.image}
            />
          ))
        ) : response.length === 0 ? (
          <div>No matching Recipes found!</div>
        ) : (
          response.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.title}
              usedIngredients={item.usedIngredients}
              missedIngredients={item.missedIngredients}
              ingredients={item.usedIngredients.slice(0, 3)}
              image={item.image}
            />
          ))
        )}
      </div>
    </div>
  );
}
