import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ClothesRow from "./closetUtils/ClothesRow.js";
import port from "./../data/port.json";

const Closet = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    await axios
      .get(port.url + "/api/closet/list", {
        headers: { accessToken: cookies.userData.accessToken },
      })
      .then((res) => {
        setItems(res.data.posts);
        console.log(res.data.posts);
      });
  };

  return (
    <div style={{ paddingTop: 100 + "px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>CLOSET</h1>
        <p>
          When you upload your clothes,
          <br />
          AI will classfy your clothes.
          <br />
          And You can Drag and Drop clothes!
        </p>
        <div>
          <button
            onClick={() => {
              navigate("upload");
            }}
          >
            upload
          </button>
          <button>오늘의 옷</button>
        </div>
      </div>
      <hr></hr>
      <ClothesRow items={items} setItems={setItems} />
    </div>
  );
};

export default Closet;
