import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClothesRow from "./closetUtils/ClothesRow.js";

const Closet = () => {
  //upload창 관리하기 위한 state
  const [uploadActive, setUploadActive] = useState(false);
  const [downloadImg, setDownloadImg] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {}, [uploadActive]);

  console.log("downloadImg", downloadImg);
  return (
    <div style={{ paddingTop: 100 + "px" }}>
      Closet
      <ClothesRow />
      <button
        onClick={() => {
          navigate("upload");
        }}
      >
        upload
      </button>
    </div>
  );
};

export default Closet;
