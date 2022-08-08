import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgs from "../../data/imgs.json";
import { fetchImages } from "../../redux";
import { connect } from "react-redux";

const OotdImages = ({ fetchImages, loading, images }) => {
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
    fetchImages();
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
      {/* <div>{imagesItems}</div> */}
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
                  navigate("/board/" + it.shortId);
                }}
                src={it.img.url}
                alt="ootd"
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

const mapStateToProps = ({ images }) => {
  return {
    images: images.items,
    loading: images.loading,
  };
};

const mapDispatchToProps = {
  fetchImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(OotdImages);
