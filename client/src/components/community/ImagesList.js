import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgs from "../../data/imgs.json";

const ImagesList = ({ postType }) => {
  //서버로부터 해당하는 imagesData 받아서 저장
  //현재 ImagesList에서 관리하고 있는 curWindowWidth를 추후에 App.js나 Header.js로 빼주어야할 것 같음
  const imageBoxPadding = 32;
  const [imagesData, setImagesData] = useState(imgs);
  const [columnNumber, setColumNumber] = useState(5);
  const [curWindowWidth, setCurWindowWidth] = useState(
    document.documentElement.clientWidth - imageBoxPadding
  );

  const navigate = useNavigate();

  useEffect(() => {
    setCurWindowWidth(document.documentElement.clientWidth - 32);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [imagesData]);

  //현재 브라우저의 너비에 따라 반응형으로 이미지 표시
  const handleResize = () => {
    if (
      document.documentElement.clientWidth < 1400 &&
      document.documentElement.clientWidth > 900
    ) {
      setColumNumber(4);
    } else if (document.documentElement.clientWidth > 1400) {
      setColumNumber(5);
    } else if (document.documentElement.clientWidth < 900) {
      setColumNumber(3);
    }
    setCurWindowWidth(document.documentElement.clientWidth - imageBoxPadding);
  };

  const handleScroll = () => {
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    const curScroll = window.scrollY;
    if (totalScroll - curScroll < 30) {
      //여기서 서버에 이미지 데이터 받아서 재렌더링 시켜주기
      //사진 20개씩 요청
      setImagesData([...imagesData, ...imgs]);
    }
  };

  return (
    <>
      <div
        className="image-box"
        style={{ display: "flex", flexWrap: "wrap", padding: 16 + "px" }}
      >
        {imagesData.map((it, index) => {
          return (
            <span
              key={index}
              style={{
                display: "inlineBlock",
                height: `${Math.floor(curWindowWidth / columnNumber)}px`,
                width: `${Math.floor(curWindowWidth / columnNumber)}px`,
                overflow: "hidden",
              }}
            >
              <img
                onClick={() => {
                  if (postType === 2) {
                    navigate("/board/" + it.shortId);
                  } else {
                    navigate("/market/" + it.shortId);
                  }
                }}
                src={it.img.url}
                alt={postType === 2 ? "ootd" : "market"}
                style={{
                  width: 100 + "%",
                  height: 100 + "%",
                  objectFit: "cover",
                }}
              ></img>{" "}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default ImagesList;
