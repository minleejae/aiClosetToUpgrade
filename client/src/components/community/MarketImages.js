import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMarketImages } from "../../redux";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";

const MarketImages = ({
  fetchMarketImages,
  images,
  width,
  columns,
  perPages,
}) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMarketImages(images.length, perPages, cookies.userData.accessToken);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    const curScroll = window.scrollY;
    if (totalScroll - curScroll < 30) {
      //여기서 서버에 이미지 데이터 받아서 재렌더링 시켜주기
      //image 값이 동기화 되지 않고 있음 이를 수정 필요
      fetchMarketImages(images.length, perPages, cookies.userData.accessToken);
    }
  };

  return (
    <>
      <div
        className="image-box"
        style={{ display: "flex", flexWrap: "wrap", padding: 16 + "px" }}
      >
        {images.map((it, index) => {
          const srcUrl = port.url + "/" + it.img.url.split("/")[1];
          return (
            <span
              key={index}
              style={{
                display: "inlineBlock",
                height: `${Math.floor(width / columns)}px`,
                width: `${Math.floor(width / columns)}px`,
                overflow: "hidden",
              }}
            >
              <img
                onClick={() => {
                  navigate("/market/" + it.shortId);
                }}
                src={srcUrl}
                alt="market"
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

const mapStateToProps = ({ marketImages, width }) => {
  return {
    images: marketImages.items,
    loading: marketImages.loading,
    width: width.width,
    columns: width.columns,
    perPages: width.perPages,
  };
};

const mapDispatchToProps = {
  fetchMarketImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketImages);
