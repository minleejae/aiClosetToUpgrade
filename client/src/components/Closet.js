import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClothesRow from "./closetUtils/ClothesRow.js";

const Closet = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div style={{ paddingTop: 100 + "px" }}>
      Closet
      <button
        onClick={() => {
          navigate("upload");
        }}
      >
        upload
      </button>
      <ClothesRow />
    </div>
  );
};

export default Closet;
