import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function About() {
  return (
    <>
      <div style={{ minHeight: "calc(80vh)" }}>
        <Navbar />
        <div
          style={{
            marginTop: "70px",
            fontSize: "1.2em",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <p> Recipez. is a simple Web Application built on MERN stack.</p>
          <p>
            {" "}
            Spoonacular API is used to fetch recipes. See the full documentation{" "}
            <a href="https://spoonacular.com/food-api/docs">here</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
