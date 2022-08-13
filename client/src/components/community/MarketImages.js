import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMarketImages } from "../../redux";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";

const MarketImages = ({
  fetchMarketImages,
  images,
  loading,
  width,
  columns,
  perPages,
  hasMore,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const observer = useRef();

  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      if (!hasMore) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("visible");
          fetchMarketImages(
            images.length,
            perPages,
            cookies.userData.accessToken
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (count === 0) window.scrollTo(0, 0);
    fetchMarketImages(images.length, perPages, cookies.userData.accessToken);
  }, []);

  //무한스크롤 기능 수정 더 효율적으로 필요 현재 게시물이 적은 경우 요청을 많이함

  return (
    <>
      <div
        className="image-box"
        style={{ display: "flex", flexWrap: "wrap", padding: 16 + "px" }}
      >
        {images.map((it, index) => {
          const srcUrl = port.url + "/" + it.img.url.split("/")[1];
          if (images.length === index + 1) {
            return (
              <span
                key={index}
                style={{
                  display: "inlineBlock",
                  height: `${Math.floor(width / columns)}px`,
                  width: `${Math.floor(width / columns)}px`,
                  overflow: "hidden",
                }}
                ref={lastImageElementRef}
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
          } else
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
    hasMore: marketImages.hasMore,
    width: width.width,
    columns: width.columns,
    perPages: width.perPages,
  };
};

const mapDispatchToProps = {
  fetchMarketImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketImages);
