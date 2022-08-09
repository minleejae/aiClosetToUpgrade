import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOotdImages } from "../../redux";
import { connect } from "react-redux";
import port from "../../data/port.json";

const OotdImages = ({
  fetchOotdImages,
  loading,
  images,
  width,
  columns,
  perPages,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchOotdImages(1, perPages);
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
      //서버 변동필요
      // fetchOotdImages((누적숫자), perPages);
      fetchOotdImages(1, perPages);
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
    </>
  );
};

const mapStateToProps = ({ images, width }) => {
  return {
    images: images.items,
    loading: images.loading,
    width: width.width,
    columns: width.columns,
    perPages: width.perPages,
  };
};

const mapDispatchToProps = {
  fetchOotdImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(OotdImages);
