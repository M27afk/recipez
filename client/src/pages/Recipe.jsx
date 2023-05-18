import React from "react";
import Navbar from "../components/Navbar";
import RecipeBig from "../components/RecipeBig";
import Footer from "../components/Footer";

export default function Recipe() {
  return (
    <>
      <div style={{ minHeight: "calc(90vh)" }}>
        <Navbar />
        <RecipeBig />
      </div>
      <Footer />
    </>
  );
}
