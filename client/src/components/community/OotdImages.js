import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOotdImages } from "../../redux";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const OotdImages = ({ fetchOotdImages, images, width, columns, perPages }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const curImages = useSelector((state) => state.ootdImages.items);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) window.scrollTo(0, 0);
    fetchOotdImages(count, perPages, cookies.userData.accessToken);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [count]);

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
                  navigate("/board/" + it.shortId);
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

const mapStateToProps = ({ ootdImages, width }) => {
  return {
    images: ootdImages.items,
    loading: ootdImages.loading,
    width: width.width,
    columns: width.columns,
    perPages: width.perPages,
  };
};

const mapDispatchToProps = {
  fetchOotdImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(OotdImages);
