import React, { useEffect, useRef, useState } from "react";
import port from "../../data/port.json";
import styled, { keyframes } from "styled-components";
import useOnClickOutside from "./useOnClickOutside";

const fadeIn = keyframes`{
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`;

const PresentationDiv = styled.div`
  z-index: 1200;
  position: absolute;
`;

const WrapperModal = styled.div`
  position: fixed;
  inset: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0 0 0 / 71%);
  -webkit-tap-highlight-color: transparent;
`;

const Modal = styled.div.attrs(({ ref }) => ({ ref: ref }))`
  position: relative;
  width: 800px;
  height: 500px;
  background-color: #f8f9fa;
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  transition: all 400ms ease-in-out 2s;
  animation: ${fadeIn} 400ms;
`;

const ModalClose = styled.span`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 1000;
  color: black;
`;

const CasualImg = styled.img`
  grid-column: 2/4;
  grid-row: 2/4;
  width: 90%;
  height: 90%;
  object-fit: full;
  margin: auto;
  cursor: pointer;
`;

const SuitlImg = styled.img`
  grid-column: 4/6;
  grid-row: 2/4;
  width: 90%;
  height: 90%;
  object-fit: full;
  margin: auto;
  cursor: pointer;
`;

const TitleDiv = styled.div`
  grid-column: 3/5;
  text-align: center;
  margin: auto 0;
`;

const CasualText = styled.h4`
  align-self: top;
  text-align: center;
  justify-self: center;
  border-radius: 10px;
  grid-column: 2/4;
  grid-row: 4/5;
`;

const SuitText = styled.h4`
  align-self: top;
  text-align: center;
  justify-self: center;
  border-radius: 10px;
  grid-column: 4/6;
  grid-row: 4/5;
`;
const TopImage = styled.img`
  grid-column: 1/3;
  grid-row: 2/4;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
  border: 1px solid silver;
`;

const BottomImage = styled.img`
  grid-column: 3/5;
  grid-row: 2/4;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
  border: 1px solid silver;
`;

const ShoeImage = styled.img`
  grid-column: 5/7;
  grid-row: 2/4;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
  border: 1px solid silver;
`;

const RecommendationModal = ({ todayRecommend, setModalOpen }) => {
  const [selected, setSelected] = useState("");
  const [recommendItems, setRecommentItems] = useState(null);
  const ref = useRef();

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <PresentationDiv>
      <WrapperModal>
        <Modal ref={ref}>
          <ModalClose
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </ModalClose>
          {selected === "" ? (
            <>
              <TitleDiv>
                <h2>오늘의 옷</h2>
                <h5>원하는 스타일을 클릭하세요!</h5>
              </TitleDiv>
              <CasualImg
                src={require("./casual.png")}
                onClick={() => {
                  setSelected("CASUAL");
                  const items = todayRecommend("CASUAL");
                  setRecommentItems(items);
                }}
              />
              <CasualText>CASUAL</CasualText>
              <SuitlImg
                src={require("./suit.png")}
                onClick={() => {
                  setSelected("SUIT");
                  const items = todayRecommend("SUIT");
                  setRecommentItems(items);
                }}
              />
              <SuitText>SUIT</SuitText>
            </>
          ) : (
            <>
              <TitleDiv>
                <h2>오늘의 옷</h2>
                <h5>오늘의 패션은 어떤가요?</h5>
              </TitleDiv>
              <TopImage
                src={port.url + "/" + recommendItems.top.img.url.split("/")[1]}
                alt="recommended top"
              />
              <BottomImage
                src={
                  port.url + "/" + recommendItems.bottom.img.url.split("/")[1]
                }
                alt="recommended bottom"
              />
              <ShoeImage
                src={port.url + "/" + recommendItems.shoe.img.url.split("/")[1]}
                alt="recommended shoe"
              />
              <button
                style={{
                  gridColumn: "3/5",
                  gridRow: "4/5",
                  width: "100px",
                  height: "50px",
                  borderRadius: "10px",
                  justifySelf: "center",
                  alignSelf: "center",
                }}
                className="btn btn-outline-info"
                onClick={() => {
                  setSelected("");
                }}
              >
                다시하기
              </button>
            </>
          )}
        </Modal>
      </WrapperModal>
    </PresentationDiv>
  );
};

export default RecommendationModal;
