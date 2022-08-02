import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ClothesRow.css";
import port from "./../../data/port.json";

const ClothesRow = () => {
  //userid에 따른 옷데이터
  const [items, setItems] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    await axios.get(port.url + "/users/5").then((res) => {
      console.log(res.data);
      setItems(res.data);
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
      <h1>Top</h1>
      <div className="row-container">
        {items.map((item, index) => {
          if (item.type === "top") {
            return (
              <div>
                <img
                  key={index}
                  src={item.src}
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
      <h1>Bottom</h1>
      <div className="row-container">
        {items.map((item, index) => {
          if (item.type === "bot") {
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
      <h1>Shoes</h1>
      <div className="row-container">
        {items.map((item, index) => {
          if (item.type === "shoe") {
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
