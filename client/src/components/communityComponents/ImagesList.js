import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgs from "./../../data/imgs.json";

const ImagesList = () => {
  //서버로부터 해당하는 imagesData 받아서 저장
  //현재 ImagesList에서 관리하고 있는 curWindowWidth를 추후에 App.js나 Header.js로 빼주어야할 것 같음
  const imageBoxPadding = 32;
  const [imagesData, setImagesData] = useState(imgs);
  const [columnNumber, setColumNumber] = useState(5);
  const [curWindowWidth, setCurWindowWidth] = useState(
    document.documentElement.clientWidth - imageBoxPadding
  );
  //스크롤 정보 구현 예정
  console.log(
    ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
  );
  // -----
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
      <div className="image-box" style={{ display: "flex", flexWrap: "wrap" }}>
        {imagesData.map((it, index) => {
          return (
            <span
              key={index}
              style={{
                display: "inlineBlock",
                width: `${Math.floor(curWindowWidth / columnNumber)}px`,
                padding: 0.35 + "%",
              }}
            >
              <img
                onClick={() => {
                  navigate("/board/" + it.shortId);
                }}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPd2_VbD-GW5hGBHecvO1eBsf0LwNbZdloVmtp-KEQ&s"
                }
                alt="ootd"
                style={{ border: "1px solid #D3D3D3" }}
              ></img>{" "}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default ImagesList;
