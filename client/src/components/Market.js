import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./componentsCss/Community.css";
import MarketImages from "./community/MarketImages";

const Market = () => {
  const [searchType, setSearchType] = useState("제목");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = (e) => {
    console.log("handleChange", e.target.value);
    setSearchValue(e.target.value);
  };

  const optimisedVersion = useCallback(debounce(handleChange), []);

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
        <p style={{ fontSize: 22 + "px" }}>
          Upload Your Cloth to Sell!
          <br />
          Share Your Fashion with Friends!
        </p>
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            navigate("/market/write");
          }}
        >
          글쓰기
        </button>
      </div>
      <hr></hr>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          width: 30 + "%",
          margin: "auto",
        }}
      >
        <div className="input-group mb-3">
          <div className="input-group-text p-0" style={{ width: 30 + "%" }}>
            <select
              className="form-select form-select-lg shadow-none bg-light border-0"
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
            >
              <option>제목</option>
              <option>내용</option>
              <option>제목 내용</option>
              <option>작성자</option>
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            placeholder="Search Here"
            onChange={optimisedVersion}
          />
          {/* <button className="input-group-text shadow-none px-4 btn-warning">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button> */}
        </div>
      </form>
      <div className="image-list">
        <MarketImages
          postType={3}
          searchType={searchType}
          searchValue={searchValue}
        ></MarketImages>
      </div>
    </div>
  );
};

export default Market;
