import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOotdImages } from "../../redux";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";

const OotdImages = ({
  fetchOotdImages,
  images,
  loading,
  width,
  columns,
  perPages,
  hasMore,
  searchType,
  searchValue,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const observer = useRef();

  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      if (!hasMore) return;
      if (searchValue) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchOotdImages(
            images.length,
            perPages,
            cookies.userData.accessToken,
            searchType,
            searchValue
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchOotdImages(
      0,
      perPages,
      cookies.userData.accessToken,
      searchType,
      searchValue
    );
  }, [searchValue]);

  return (
    <>
      <div
        className="image-box"
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: 16 + "px",
          justifyContent: "center",
        }}
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
              ref={images.length === index + 1 ? lastImageElementRef : null}
            >
              <img
                onClick={() => {
                  navigate("/board/" + it.shortId);
                }}
                src={srcUrl}
                alt="ootd"
                style={{
                  width: 100 + "%",
                  height: 100 + "%",
                  objectFit: "cover",
                }}
              />
            </span>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = ({ ootdImages, width }) => {
  return {
    images: ootdImages.items,
    loading: ootdImages.loading,
    hasMore: ootdImages.hasMore,
    width: width.width,
    columns: width.columns,
    perPages: width.perPages,
  };
};

const mapDispatchToProps = {
  fetchOotdImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(OotdImages);
