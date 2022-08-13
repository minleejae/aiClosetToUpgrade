import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./componentsCss/Community.css";
import MarketImages from "./community/MarketImages";
import SearchBar from "./community/SearchBar";

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
      <hr></hr>
      <div>
        <SearchBar></SearchBar>
      </div>
      <div className="image-list">
        <MarketImages postType={3}></MarketImages>
      </div>
    </div>
  );
};

export default Market;
