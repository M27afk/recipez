import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Card from "./Card";

export default function ProfileMain() {
  const { user } = useContext(AuthContext);
  const [res, setRes] = useState([]);
  const [valid, setValid] = useState(false);
  const URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const getFavs = async () => {
      try {
        const users = await axios.post(`${URL}/user/listfav`, {
          id: user.id,
        });
        setRes(users.data);

        if (users.length > 0) {
          setValid(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFavs();
  }, []);

  return (
    <>
      <div
        style={{
          marginTop: "70px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "15px" }}>
          Welcome <b>{user.name}!</b>
        </div>
        <div>
          <div style={{ textAlign: "center" }}>Favourite Recipes</div>
          <div id="cards-area">
            {res.length === 0 ? (
              <div>No favourites!</div>
            ) : (
              res.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  //   usedIngredients={item.usedIngredients}
                  //   missedIngredients={item.missedIngredients}
                  ingredients={item.ingr}
                  trial={item.ingr}
                  image={item.img}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
