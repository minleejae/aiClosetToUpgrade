import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImagesList from "./community/ImagesList";
import "./componentsCss/Community.css";

const Market = () => {
  const navigate = useNavigate();
  console.log("Market!");
  return (
    <div style={{ paddingTop: 100 + "px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>MARKET</h1>
        <p>
          Upload Your Cloth to Sell!
          <br />
          Share Your Fashion with Friends!
        </p>
        <button
          onClick={() => {
            navigate("/market/write");
          }}
        >
          글쓰기
        </button>
      </div>
      <div className="image-list">
        <ImagesList postType={3}></ImagesList>
      </div>
    </div>
  );
};

export default Market;
