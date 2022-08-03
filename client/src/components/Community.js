import React, { useState, useEffect } from "react";
import WritingForm from "./communityComponents/WritingForm";
import { useNavigate } from "react-router-dom";
import ImagesList from "./communityComponents/ImagesList";
import "./componentsCss/Community.css";

const Community = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Community</h1>
      <button
        onClick={() => {
          navigate("/board/write");
        }}
      >
        글쓰기
      </button>
      <div className="image-list">
        <ImagesList></ImagesList>
      </div>
    </div>
  );
};

export default Community;
