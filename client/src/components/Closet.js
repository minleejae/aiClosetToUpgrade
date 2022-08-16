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

  const handleOrderSave = () => {
    console.log(items);

    axios
      .put(
        port.url + "/api/closet/list/update",
        { list: items },
        {
          headers: { accessToken: cookies.userData.accessToken },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
        <p style={{ fontSize: 22 + "px" }}>
          When you upload your clothes,
          <br />
          AI will classfy your clothes.
          <br />
          And You can Drag and Drop clothes!
        </p>
        <div>
          <button
            class="btn btn-outline-primary"
            onClick={() => {
              navigate("upload");
            }}
            style={{ marginRight: "5px" }}
          >
            옷 추가
          </button>
          <button
            class="btn btn-outline-success"
            onClick={() => {
              handleOrderSave();
            }}
            style={{ marginRight: "5px" }}
          >
            순서 저장
          </button>
          <button class="btn btn-outline-info">오늘의 옷</button>
        </div>
      </div>
      <hr></hr>
      <ClothesRow items={items} setItems={setItems} />
    </div>
  );
};

export default Closet;
