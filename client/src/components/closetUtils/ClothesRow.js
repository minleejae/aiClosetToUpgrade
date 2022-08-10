import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ClothesRow.css";
import port from "./../../data/port.json";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #333;
  padding: 1rem;
  margin-top: 1rem;
`;

const DraggableDiv = styled.div`
  display: flex;
  padding: 1rem;
  width: 200px;
  height: 200px;
  background-color: white;
  border: 1px solid black;
  cursor: grab;
`;

const DeleteButton = styled.input.attrs({
  type: "submit",
  value: "X",
})`
  margin: -10px;
  height: 30px;
  border-radius: 15%;
  background-color: white;
`;

const ClothesRow = () => {
  //userid에 따른 옷데이터
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [items, setItems] = useState([]);

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

  //server에 image delete 요청 보내야함
  const handleDeleteBtn = (id) => {
    const newItems = items.filter((it) => {
      return it.id !== id;
    });
    setItems(newItems);
  };

  //로우 컴포넌트
  const RowComponent = ({ itemCategroy }) => (
    <>
      <h1 style={{ textAlign: "center" }}>{itemCategroy}</h1>
      <Container>
        {items.map((item, index) => {
          const imgUrl = port.url + "/" + item.img.url.split("/")[1];
          if (item.img.category === itemCategroy) {
            console.log(item._id);
            return (
              <div key={item._id} draggable>
                <DraggableDiv>
                  <img
                    src={imgUrl}
                    alt={item.type}
                    style={{
                      userDrag: "none",
                      WebkitUserDrag: "none",
                      width: 100 + "%",
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      handleDeleteBtn(item.id);
                    }}
                  />
                </DraggableDiv>
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </Container>
    </>
  );

  return (
    <>
      <RowComponent key={"TOP"} itemCategroy={"TOP"} />
      <RowComponent key={"BOTTOM"} itemCategroy={"BOTTOM"} />
      <RowComponent key={"SHOE"} itemCategroy={"SHOE"} />
      <RowComponent key={"ETC"} itemCategroy={"ETC"} />
    </>
  );
};

export default ClothesRow;
