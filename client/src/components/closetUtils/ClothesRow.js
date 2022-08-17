import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./ClothesRow.css";
import port from "./../../data/port.json";
import styled from "styled-components";
import { useCookies } from "react-cookie";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #333;
  padding: 1rem;
  min-height: 230px;
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
  margin: -14px;
  width: 30px;
  height: 30px;

  border-radius: 100%;
  background-color: white;
`;

const CATEGORY_TYPE = ["TOP", "BOTTOM", "SHOE", "ETC"];

const ClothesRow = ({ items, setItems }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragItemNode = useRef();
  const draggableItems = useRef([]);
  const containersRef = useRef([]);

  useEffect(() => {
    draggableItems.current = draggableItems.current.slice(0, items.length);
  }, [items]);

  //server에 image delete 요청 보내야함
  const handleDeleteBtn = (item) => {
    if (!window.confirm("옷장에서 옷을 삭제하시겠습니까?")) {
      alert("취소 했습니다.");
      return;
    }

    const newItems = items.filter((it) => {
      return it._id !== item._id;
    });
    setItems(newItems);

    axios
      .delete(port.url + `/api/closet/delete/${item.shortId}`, {
        headers: { accessToken: cookies.userData.accessToken },
      })
      .catch((err) => {
        console.log(err);
      });

    alert("옷을 삭제했습니다.");
  };

  // --------------------------drag and Drop---------------------------------------------------

  const handleDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", (e) => {
      handleDragEnd(e, item);
    });
    dragItem.current = item.item;

    setTimeout(() => {
      setDragging(true);
      setDraggingItem(item);
    }, 0);
  };

  //현재 드래그 위치와 가장 가까운 사진을 찾는 함수
  const getClosest = (pageX, pageY) => {
    let calculateOffset = draggableItems.current.reduce(
      (acc, it, index) => {
        const itInfo = it.getBoundingClientRect();
        const y = itInfo.top + itInfo.height / 2 + window.scrollY;
        const x = itInfo.right - itInfo.width / 2 + window.scrollX;
        const curOffset = Math.abs(pageX - x) + Math.abs(pageY - y);
        if (curOffset < acc.offset) {
          acc.offset = curOffset;
          acc.selected = index;
          if (pageX > x) acc.direction = "right";
          else acc.direction = "left";
        }
        return acc;
      },
      {
        offset: Number.POSITIVE_INFINITY,
        selected: -1,
        direction: "right",
        toEmptyContainer: "INIT",
      }
    );

    containersRef.current.reduce((acc, it, index) => {
      const itInfo = it.getBoundingClientRect();
      const y = itInfo.top + itInfo.height / 2 + window.scrollY;
      const x = itInfo.right - itInfo.width / 2 + window.scrollX;
      const curOffset = Math.abs(pageX - x) + Math.abs(pageY - y);
      if (curOffset < acc.offset) {
        acc.offset = curOffset;
        acc.toEmptyContainer = index;
      }
      return acc;
    }, calculateOffset);

    return calculateOffset;
  };

  const handleDragEnd = (e, item) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", (e) => {
      handleDragEnd(e, item);
    });
    dragItemNode.current = null;

    //가장 가까운 요소 찾기
    const result = getClosest(e.pageX, e.pageY);
    //깊은 복사 : 드래그시 이미지의 타입을 변경해주는 효과를 만들기 위함
    const copyItem = JSON.parse(JSON.stringify(item));
    let newItems = [...items];
    newItems.splice(copyItem.itemIndex, 1);

    //image 옆으로 이동하는 경우
    if (result.toEmptyContainer === "INIT") {
      copyItem.item.img.category = items[result.selected].img.category;

      if (result.direction === "right") {
        newItems.splice(result.selected, 0, copyItem.item);
      } else {
        if (result.selected === 0) {
          newItems = [copyItem.item, ...newItems];
        } else newItems.splice(result.selected - 1, 0, copyItem.item);
      }
    } else {
      //emptyContainer로 가는경우
      copyItem.item.img.category = CATEGORY_TYPE[result.toEmptyContainer];

      newItems = [...newItems, copyItem.item];
    }
    setItems(newItems);
  };

  //놓기 전에 효과 주려면 위치계산하는 걸 dragEnter에서도 만들어야함->나중에
  const handleDragEnter = (e, category) => {
    const result = getClosest(e.pageX, e.pageY);

    // // 깊은 복사 : 드래그시 이미지의 타입을 변경해주는 효과를 만들기 위함
    // const copyItem = JSON.parse(JSON.stringify(draggingItem));
    // let newItems = [...items];
    // newItems.splice(copyItem.itemIndex, 1);
  };

  //로우 컴포넌트
  const RowComponent = ({ itemCategroy, categoryIndex }) => (
    <div
      key={itemCategroy}
      onDragEnter={(e) => handleDragEnter(e, itemCategroy)}
      ref={(el) => (containersRef.current[categoryIndex] = el)}
    >
      <h1 style={{ textAlign: "center", paddingTop: 10 + "px" }}>
        {itemCategroy}
      </h1>
      <Container>
        {items?.map((item, itemIndex) => {
          const imgUrl = port.url + "/" + item.img.url.split("/")[1];
          return (
            item.img.category === itemCategroy && (
              <div
                key={itemIndex}
                draggable
                className="draggable"
                onDragStart={(e) => {
                  handleDragStart(e, { item, itemIndex });
                }}
              >
                <DraggableDiv>
                  <img
                    src={imgUrl}
                    alt={item.type}
                    style={{
                      userDrag: "none",
                      WebkitUserDrag: "none",
                      width: 100 + "%",
                    }}
                    className={itemCategroy}
                    ref={(el) => (draggableItems.current[itemIndex] = el)}
                  />
                  <DeleteButton
                    onClick={() => {
                      handleDeleteBtn(item);
                    }}
                  />
                </DraggableDiv>
              </div>
            )
          );
        })}
      </Container>
    </div>
  );

  return (
    <>
      <RowComponent key={"TOP"} itemCategroy={"TOP"} categoryIndex={0} />
      <RowComponent key={"BOTTOM"} itemCategroy={"BOTTOM"} categoryIndex={1} />
      <RowComponent key={"SHOE"} itemCategroy={"SHOE"} categoryIndex={2} />
      <RowComponent key={"ETC"} itemCategroy={"ETC"} categoryIndex={3} />
      <div style={{ height: "4vw" }}></div>
    </>
  );
};

export default ClothesRow;
