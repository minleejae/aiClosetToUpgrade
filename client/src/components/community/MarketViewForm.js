import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";
import Comments from "./Comments";
import LikeDislikes from "./LikeDislikes";

import styled from "styled-components";

const TitleContainer = styled.div`
  width: 70vw;
  height: 3vw;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const TItleDiv = styled.div`
  width: 50vw;
  height: 3vw;
  color: gray;
  display: flex;
  algin-items: center;
  font-size: 2.3vw;
`;

const ContainerDiv = styled.div`
  width: 70vw;
  height: 40vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommunityTitle = styled.div`
  width: 50vw;
  height: 5vw;
`;

const ArrowDiv = styled.div`
  width: 10vw;
  height: 10vw;
  display: flex;
  alight-items: center;
  justify-content: center;
  &:hover {
    color: black;
    cursor: pointer;
  }
  font-size: 10vw;
  color: silver;
`;

const ImageDiv = styled.div`
  width: 50vw;
  height: 40vw;
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  border: 1px solid silver;
`;

const ContentDiv = styled.div`
  width: 50vw;
  height: 100%;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 70vw;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const ContentRow = styled.div`
  width: 50vw;
  height: 4vw;
  display: flex;
  font-size: 2vw;
  justify-content: space-between;
`;

const ContentContentRow = styled.div`
  width: 50vw;
  display: flex;
  font-size: 2vw;
  justify-content: space-between;
  overflow: hidden;
  word-wrap: break-word;
`;

const ContentRowDivide = styled.div`
  width: 25vw;
  height: 4w;
  position: relative;
`;

const MarketViewForm = ({ postType }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const paramsId = useParams().id;
  const [curPost, setCurPost] = useState(null);
  const [myPost, setMyPost] = useState(false);
  const [nextPost, setNextPost] = useState(null);
  const [prePost, setPrePost] = useState(null);

  useEffect(() => {
    getPost();
    getPrePost();
    getNextPost();
  }, []);

  const getPost = async () => {
    const post = await axios.get(port.url + `/api/market/list/${paramsId}`, {
      headers: { accessToken: cookies.userData.accessToken },
    });
    setCurPost(post.data);
    setMyPost(post.data.author.email === cookies.userData.email);
  };

  const getPrePost = async () => {
    const prev = await axios.get(
      port.url + `/api/movepost/prevpost?shortId=${paramsId}&postType=3`,
      {
        headers: { accessToken: cookies.userData.accessToken },
      }
    );
    setPrePost(prev.data.targetData.shortId);
  };

  const getNextPost = async () => {
    const nxt = await axios.get(
      port.url + `/api/movepost/nextpost?shortId=${paramsId}&postType=3`,
      {
        headers: { accessToken: cookies.userData.accessToken },
      }
    );
    setNextPost(nxt.data.targetData.shortId);
  };

  const handleUpdateButton = () => {
    navigate("update");
    window.location.reload();
  };

  const handleRemoveButton = async () => {
    try {
      await axios.delete(port.url + `/api/market/list/${paramsId}/delete`, {
        headers: { accessToken: cookies.userData.accessToken },
      });
    } catch {}
    navigate("/market");
    window.location.reload();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <TitleContainer>
          <TItleDiv>MARKET</TItleDiv>
        </TitleContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ContainerDiv>
            <ArrowDiv>
              {nextPost && (
                <i
                  className="fa-solid fa-angle-left"
                  style={{
                    margin: "auto",
                  }}
                  onClick={() => {
                    navigate("/market/" + nextPost);
                    window.location.reload();
                  }}
                ></i>
              )}
            </ArrowDiv>
            <ImageDiv>
              {curPost && (
                <img
                  src={port.url + "/" + curPost?.img.url.split("/")[1]}
                  alt="post"
                  style={{ width: "100%" }}
                />
              )}
            </ImageDiv>
            <ArrowDiv>
              {prePost && (
                <i
                  className="fa-solid fa-angle-right"
                  style={{
                    margin: "auto",
                  }}
                  onClick={() => {
                    navigate("/market/" + prePost);
                    window.location.reload();
                  }}
                ></i>
              )}
            </ArrowDiv>
          </ContainerDiv>
        </div>
        <ContentContainer>
          <ContentDiv>
            <ContentRow>
              <ContentRowDivide>
                <div
                  style={{
                    fontSize: "1.5vw",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                >
                  {curPost && curPost.author.name}
                </div>
              </ContentRowDivide>
              <ContentRowDivide>
                <div
                  style={{
                    textAlign: "right",
                    color: "#777",
                    fontSize: "1.3vw",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                >
                  조회수 : {curPost && curPost.views}
                </div>
              </ContentRowDivide>
            </ContentRow>
            <p
              style={{
                fontSize: "1.5vw",
                lineHeight: "130%",
              }}
            >
              {curPost && curPost.title}
              <br></br>
              가격 : {curPost && curPost.price}원<br></br>
              {curPost && curPost.content}
            </p>
            <ContentRow>
              <div style={{ fontSize: "1.5vw" }}>
                <LikeDislikes keyId={paramsId} urlType={"postId"} />
              </div>
              <div>
                {myPost ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      style={{
                        fontSize: "1vw",
                      }}
                      onClick={() => {
                        handleUpdateButton();
                      }}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      style={{ fontSize: "1vw" }}
                      onClick={() => {
                        handleRemoveButton();
                      }}
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <></>
                )}
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  style={{ fontSize: "1vw" }}
                  onClick={() => navigate(-1)}
                >
                  뒤로가기
                </button>
              </div>
            </ContentRow>
            <hr></hr>
          </ContentDiv>
        </ContentContainer>
        <ContentContainer>
          <ContentDiv>
            <div>
              {curPost && (
                <Comments
                  postId={paramsId}
                  curPost={curPost}
                  getPost={getPost}
                ></Comments>
              )}
            </div>
          </ContentDiv>
        </ContentContainer>
      </div>
    </>
  );
};

const mapStateToProps = ({ marketImages }) => {
  return {
    images: marketImages.items,
  };
};

export default connect(mapStateToProps)(MarketViewForm);
