import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import Heart from "../assets/heart.svg";
import HeartFilled from "../assets/heart-filled.svg";
import { AuthContext } from "../context/authContext";
import axios from "axios";

export default function Card(props) {
  const navigate = useNavigate();
  let ing = "";
  props.ingredients?.map((item) => {
    if (item.name != undefined) ing += `${item.name},`;
    else ing += `${item},`;
  });
  const { user } = useContext(AuthContext);

  const [fav, changeFav] = useState(false);
  const URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await axios.post(`${URL}/user/findfav`, {
          recipe: props.id,
          id: user.id,
        });
        if (users.data === "found") {
          changeFav(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleClick = () => {
    const IngrList = [];
    props.usedIngredients?.map((item) => {
      IngrList.push(item.original);
    });
    props.missedIngredients?.map((item) => {
      IngrList.push(item.original);
    });
    props.trial?.map((item) => {
      IngrList.push(item);
    });
    // const ingr = props.usedIngredients.concat(props.missedIngredients);
    navigate(`/recipes/${props.id}`, {
      state: {
        name: props.name,
        ingredients: IngrList,
        image: props.image,
        id: props.id,
      },
    });
  };
  const handleFav = async () => {
    if (!fav) {
      const IngrList = [];
      props.usedIngredients.map((item) => {
        IngrList.push(item.original);
      });
      props.missedIngredients.map((item) => {
        IngrList.push(item.original);
      });

      try {
        const res = await axios.patch(`${URL}/user/recipe${user.id}`, {
          id: props.id,
          name: props.name,
          img: props.image,
          ingr: IngrList,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.delete(`${URL}/user/recipe${user.id}`, {
          data: { id: props.id },
        });
      } catch (err) {
        console.log(err);
      }
    }
    changeFav(!fav);
  };
  return (
    <div className="item">
      <div className="item-wrapper">
        <div className="content-wrapper">
          <div className="img-container">
            <img className="item-img" src={props.image} />
            <img
              className="favIcon"
              src={fav ? HeartFilled : Heart}
              onClick={handleFav}
            />
          </div>

          <div className="content-text">
            <div className="item-name">{props.name} </div>
            <div className="item-subtext-container">
              <span className="item-subtext">{ing} and more</span>
            </div>
          </div>
        </div>
        <div className="view-more-btn" onClick={handleClick}>
          Cook Now!
        </div>
      </div>
    </div>
  );
}
