import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";
import Comments from "./Comments";
import LikeDislikes from "./LikeDislikes";

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
  };

  const handleRemoveButton = async () => {
    try {
      await axios.delete(port.url + `/api/market/list/${paramsId}/delete`, {
        headers: { accessToken: cookies.userData.accessToken },
      });
    } catch {}
    navigate("/market");
  };

  return (
    <div style={{ paddingTop: 100 + "px", justifyContent: "center" }}>
      <h1>{postType === 2 ? "OOTD" : "MARKET"}</h1>
      <div className="album">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center" }}>
            {nextPost && (
              <i
                className="fa-solid fa-angle-left"
                style={{ fontSize: 150 + "px", color: "gray" }}
                onClick={() => {
                  navigate("/market/" + nextPost);
                  window.location.reload();
                }}
              ></i>
            )}
            <div
              className="card mb-3"
              style={{
                width: 100 + "%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex" }}>
                {curPost && (
                  <img
                    src={port.url + "/" + curPost?.img.url.split("/")[1]}
                    alt="temp"
                    style={{ width: 60 + "%" }}
                  />
                )}
              </div>
            </div>
            {prePost && (
              <i
                className="fa-solid fa-angle-right"
                style={{ fontSize: 150 + "px", color: "gray" }}
                onClick={() => {
                  navigate("/market/" + prePost);
                  window.location.reload();
                }}
              ></i>
            )}
          </div>
          <div className="mb-3">
            <h1>제목: {curPost && curPost.title}</h1>
            <h5>작성자 : {curPost && curPost.author.name}</h5>
          </div>
          <h4>가격 : {curPost && curPost.price} 원</h4>
          <h6>조회수 : {curPost && curPost.views}</h6>
          <div className="mb-3">
            <div style={{ border: "1px solid silver", fontSize: 1.4 + "rem" }}>
              <p>{curPost && curPost.content}</p>
            </div>
            <div>
              <LikeDislikes keyId={paramsId} urlType={"postId"} />
            </div>
          </div>
          {myPost ? (
            <>
              <button
                type="button"
                className="btn btn-outline-primary"
                style={{ marginRight: "2%" }}
                onClick={() => {
                  handleUpdateButton();
                }}
              >
                수정하기
              </button>
              <button
                type="button"
                className="btn btn-danger"
                style={{ marginRight: "2%" }}
                onClick={() => {
                  handleRemoveButton();
                }}
              >
                삭제하기
              </button>
            </>
          ) : (
            <></>
          )}
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </button>
        </div>
        {curPost && (
          <Comments
            postId={paramsId}
            curPost={curPost}
            getPost={getPost}
          ></Comments>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ marketImages }) => {
  return {
    images: marketImages.items,
  };
};

export default connect(mapStateToProps)(MarketViewForm);
