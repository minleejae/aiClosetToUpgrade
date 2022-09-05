import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";
import LikeDislikes from "./LikeDislikes";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto 1fr 1fr;
  grid-template-columns: 2fr 1.5fr 2fr;
  padding: 10px;
  border: 1px solid silver;
  border-radius: 1%;
`;

const Author = styled.div`
  grid-column: 1/4;
  grid-row: 1/2;
  font-size: calc(0.7vw + 12px);
  align-self: end;
  border-bottom: 1px solid silver;
`;

const Date = styled.div`
  grid-column: 1/4;
  grid-row: 1/2;
  color: gray;
  font-size: calc(0.5vw + 10px);
  align-self: end;
  justify-self: end;
`;

const Title = styled.div`
  grid-column: 1/4;
  grid-row: 2/3;
  font-size: calc(1vw + 20px);
  align-self: end;
`;

const Price = styled.div`
  font-size: calc(0.7vw + 14px);
`;

const Content = styled.div`
  grid-column: 1/4;
  grid-row: 3/4;
  font-size: calc(0.6vw + 13px);
  align-self: end;
`;

const LDContainer = styled.div`
  grid-column: 1/3;
  grid-row: 4/5;
  font-size: calc(1vw + 8px);
  align-self: end;
`;

const Crud = styled.div`
  grid-column: 1/4;
  grid-row: 4/5;
  font-size: calc(1vw + 12px);
  align-self: end;
  justify-self: end;

  @media screen and (max-width: 530px) {
    grid-row: 5/6;
  }
`;

const PostContainer = ({ curPost, myPost, paramsId }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();

  const handleUpdateButton = () => {
    navigate("update");
    window.location.reload();
  };

  const handleRemoveButton = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      alert("취소 했습니다..");
      return;
    }

    try {
      await axios.delete(port.url + `/api/market/list/${paramsId}/delete`, {
        headers: { accessToken: cookies.userData.accessToken },
      });
    } catch {}

    alert("게시글을 삭제했습니다.");

    navigate("/market");
    window.location.reload();
  };

  return (
    <div>
      <GridContainer>
        <Author>글쓴이 : {curPost.author.name}</Author>
        <Date>
          <div>작성일 : {curPost.createdAt.split("T")[0]}</div>
          <div style={{ textAlign: "end" }}>조회수 : {curPost.views}</div>
        </Date>
        <Title>
          {curPost.title}
          <br />
          {curPost.price && <Price>가격 : {curPost.price}원</Price>}
        </Title>

        <Content> {curPost.content}</Content>

        <LDContainer>
          <LikeDislikes keyId={paramsId} urlType={"postId"} />
        </LDContainer>
        <Crud>
          {myPost && (
            <>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  handleUpdateButton();
                }}
              >
                수정
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  handleRemoveButton();
                }}
              >
                삭제
              </button>
            </>
          )}
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              navigate("/market");
              window.location.reload();
            }}
          >
            뒤로가기
          </button>
        </Crud>
      </GridContainer>
    </div>
  );
};

export default PostContainer;
