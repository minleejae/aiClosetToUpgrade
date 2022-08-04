import React, { useState, useEffect } from "react";
import UploadImage from "./closetUtils/UploadImage.js";
import ClothesRow from "./closetUtils/ClothesRow.js";

const Closet = ({ loginState, setLoginState }) => {
  //upload창 관리하기 위한 state
  const [uploadActive, setUploadActive] = useState(false);
  const [downloadImg, setDownloadImg] = useState(null);

  useEffect(() => {}, [uploadActive]);

  console.log("downloadImg", downloadImg);
  return (
    <div style={{ paddingTop: 100 + "px" }}>
      Closet
      <ClothesRow />
      <button
        onClick={() => {
          setUploadActive(true);
        }}
      >
        upload
      </button>
      {uploadActive && (
        <UploadImage
          uploadActive={uploadActive}
          setUploadActive={setUploadActive}
        />
      )}
    </div>
  );
};

export default Closet;
