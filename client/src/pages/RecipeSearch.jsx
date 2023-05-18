import React from "react";
import Navbar from "../components/Navbar";
import RecipeMain from "../components/RecipeMain";
import Footer from "../components/Footer";
export default function RecipeSearch() {
  return (
    <>
      <div style={{ minHeight: "90vh" }}>
        <Navbar />
        <RecipeMain />
      </div>
      <Footer />
    </>
  );
}
