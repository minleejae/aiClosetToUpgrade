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
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) window.scrollTo(0, 0);
    fetchMarketImages(images.length, perPages, cookies.userData.accessToken);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [count]);

  //무한스크롤 기능 수정 더 효율적으로 필요 현재 게시물이 적은 경우 요청을 많이함
  const handleScroll = () => {
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    const curScroll = window.scrollY;
    if (totalScroll - curScroll < 15) {
      setCount(count + perPages);
    }
  };

  return (
    <>
      <div
        className="image-box"
        style={{ display: "flex", flexWrap: "wrap", padding: 16 + "px" }}
      >
        {images.map((it, index) => {
          console.log(images);
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
