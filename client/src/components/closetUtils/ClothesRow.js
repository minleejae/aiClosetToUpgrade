import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ClothesRow.css";
import port from "./../../data/port.json";
import { useCookies } from "react-cookie";

const ClothesRow = () => {
  //userid에 따른 옷데이터
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    await axios
      .get(port.url + "/api/closet/list/" + cookies.userData.email)
      .then((res) => {
        console.log("res", res.data.posts);
        setItems(res.data.posts);
      });
  };

  //server에 image delete 요청 보내야함
  const handleDeleteBtn = (id) => {
    const newItems = items.filter((it) => {
      return it.id !== id;
    });
    setItems(newItems);
  };

  return (
    <>
      <h1>TOP</h1>
      <div className="row-container">
        {items.map((item, index) => {
          const imgUrl = port.url + "/" + item.img.url.split("/")[1];
          if (item.img.category === "TOP") {
            return (
              <div key={item._id}>
                <img
                  key={index}
                  src={imgUrl}
                  alt={item.type}
                  className="rowImages"
                />
                <button
                  onClick={() => {
                    handleDeleteBtn(item.id);
                  }}
                >
                  X
                </button>
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
      <h1>BOTTOM</h1>
      <div className="row-container">
        {items.map((item, index) => {
          const imgUrl = port.url + "/" + item.img.url.split("/")[1];
          if (item.img.category === "BOTTOM") {
            return (
              <div key={item._id}>
                <img
                  key={index}
                  src={imgUrl}
                  alt={item.type}
                  className="rowImages"
                />
                <button
                  onClick={() => {
                    handleDeleteBtn(item.id);
                  }}
                >
                  X
                </button>
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
      <h1>SHOES</h1>
      <div className="row-container">
        {items.map((item, index) => {
          const imgUrl = port.url + "/" + item.img.url.split("/")[1];
          if (item.img.category === "SHOE") {
            return (
              <div key={item._id}>
                <img
                  key={index}
                  src={imgUrl}
                  alt={item.type}
                  className="rowImages"
                />
                <button
                  onClick={() => {
                    handleDeleteBtn(item.id);
                  }}
                >
                  X
                </button>
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
      <h1>Sorry</h1>
      <div className="row-container">
        {items.map((item, index) => {
          if (item.type === "what") {
            return (
              <img
                key={index}
                src={item.src}
                alt={item.type}
                className="rowImages"
              />
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </>
  );
};

export default ClothesRow;
