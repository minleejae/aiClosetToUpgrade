import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ClothesRow from "./closetUtils/ClothesRow.js";
import port from "./../data/port.json";
import RecommendationModal from "./closetUtils/RecommendationModal.js";

const Closet = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [modalOpen, setModalOpen] = useState(false);

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
      });
  };

  const handleOrderSave = () => {
    axios
      .put(
        port.url + "/api/closet/list/update",
        { list: items },
        {
          headers: { accessToken: cookies.userData.accessToken },
        }
      )
      .then((res) => {
        alert("현재 순서가 저장되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //type : CASUAL or SUIT
  const todayRecommend = (type = "SUIT") => {
    const topList = [];
    const bottomList = [];
    const shoeList = [];

    items.forEach((it) => {
      if (it.img.style === type) {
        if (it.img.category === "TOP") {
          topList.push(it);
        } else if (it.img.category === "BOTTOM") {
          bottomList.push(it);
        } else if (it.img.category === "SHOE") {
          shoeList.push(it);
        }
      }
    });

    if (
      topList.length === 0 ||
      bottomList.length === 0 ||
      shoeList.length === 0
    ) {
      alert(type + " 스타일의 옷이 부족합니다.");
      return false;
    }

    const top = topList[Math.floor(Math.random() * topList.length)];
    const bottom = bottomList[Math.floor(Math.random() * bottomList.length)];
    const shoe = shoeList[Math.floor(Math.random() * shoeList.length)];

    return { top, bottom, shoe };
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
            className="btn btn-outline-primary"
            onClick={() => {
              navigate("upload");
            }}
            style={{ marginRight: "5px" }}
          >
            옷 추가
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => {
              handleOrderSave();
            }}
            style={{ marginRight: "5px" }}
          >
            순서 저장
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            오늘의 옷
          </button>
        </div>
      </div>
      {modalOpen && (
        <RecommendationModal
          todayRecommend={todayRecommend}
          setModalOpen={setModalOpen}
        ></RecommendationModal>
      )}

      <hr></hr>
      <ClothesRow items={items} setItems={setItems} />
    </div>
  );
};

export default Closet;
