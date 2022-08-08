import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgs from "../../data/imgs.json";
import { fetchOotdImages } from "../../redux";
import { connect } from "react-redux";
import port from "../../data/port.json";

const OotdImages = ({ fetchOotdImages, loading, images }) => {
  //서버로부터 해당하는 imagesData 받아서 저장
  //현재 ImagesList에서 관리하고 있는 curWindowWidth를 추후에 App.js나 Header.js로 빼주어야할 것 같음
  const imageBoxPadding = 32;
  const [columnNumber, setColumNumber] = useState(5);
  const [curWindowWidth, setCurWindowWidth] = useState(
    document.documentElement.clientWidth - imageBoxPadding
  );

  const navigate = useNavigate();

  useEffect(() => {
    //파라미터 숫자를 리덕스에서 관리해야함
    fetchOotdImages(0, 15);
    console.log(port.url);
    setCurWindowWidth(document.documentElement.clientWidth - 32);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const test = () => {
    console.log(fetchOotdImages(0, 15));
    console.log("sdaaa", images);
  };

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
      test();
    }
  };

  const imagesItems = (
    <div
      className="image-box"
      style={{ display: "flex", flexWrap: "wrap", padding: 16 + "px" }}
    >
      {images.map((it, index) => {
        const srcUrl = port.url + "/" + it.img.url.split("/")[1];
        console.log("it", it);
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
                navigate("/board/" + index);
              }}
              src={srcUrl}
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
  );

  return <>{imagesItems}</>;
};

const mapStateToProps = ({ images }) => {
  return {
    images: images.items,
    loading: images.loading,
  };
};

const mapDispatchToProps = {
  fetchOotdImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(OotdImages);
