import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClothesRow from "./closetUtils/ClothesRow.js";

const Closet = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div style={{ paddingTop: 100 + "px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>CLOSET</h1>
        <p>
          When you upload your clothes,
          <br />
          AI will classfy your clothes.
          <br />
          And You can Drag and Drop clothes!
        </p>
        <div>
          <button
            onClick={() => {
              navigate("upload");
            }}
          >
            upload
          </button>
          <button>오늘의 옷</button>
        </div>
      </div>
      <hr></hr>
      <ClothesRow />
    </div>
  );
};

export default Closet;
