import React, { useState, useEffect } from "react";
import WritingForm from "./communityComponents/WritingForm";
import { useNavigate } from "react-router-dom";
import ImagesList from "./communityComponents/ImagesList";
import "./componentsCss/Community.css";

const Community = () => {
  const navigate = useNavigate();

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
        <h1>OOTD</h1>
        <p>
          Upload Your Today's Fashion!
          <br />
          Share Your Fashion with Friends!
        </p>
        <button
          onClick={() => {
            navigate("/board/write");
          }}
        >
          글쓰기
        </button>
      </div>
      <div className="image-list">
        <ImagesList></ImagesList>
      </div>
    </div>
  );
};

export default Community;
