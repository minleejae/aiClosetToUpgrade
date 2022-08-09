import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";

const MarketViewForm = ({ postType }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const paramsId = useParams().id;
  const [curPost, setCurPost] = useState(null);
  const [myPost, setMyPost] = useState(false);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const post = await axios.get(port.url + `/api/market/list/${paramsId}`, {
      headers: { accessToken: cookies.userData.accessToken },
    });
    setCurPost(post.data);
    setMyPost(post.data.author.email === cookies.userData.email);
    console.log(post.data);
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
    navigate("/board");
  };

  return (
    <div style={{ paddingTop: 100 + "px", justifyContent: "center" }}>
      <h1>{postType === 2 ? "OOTD" : "MARKET"}</h1>
      <div className="album">
        <div className="container">
          <div
            className="card mb-3"
            style={{
              width: 100 + "%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {curPost && (
              <img
                src={port.url + "/" + curPost?.img.url.split("/")[1]}
                alt="temp"
                style={{ width: 80 + "%" }}
              />
            )}
          </div>
          <div className="mb-3">
            <h1>{curPost && curPost.title}</h1>
          </div>
          <h4>가격 : {curPost && curPost.price} 원</h4>
          <div className="mb-3">
            <div style={{ border: "1px solid silver", fontSize: 1.4 + "rem" }}>
              <p>{curPost && curPost.content}</p>
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
        <div className="album container">
          ...
          <h6>아이디 : 댓글댓글</h6>
          <h6>아이디 : 댓글댓글</h6>
          <h6>아이디 : 댓글댓글</h6>
          <h6>아이디 : 댓글댓글</h6>
        </div>
        <div className="album container">
          <label htmlFor="title" className="form-label">
            댓글
          </label>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="댓글을 입력해주세요."
            />
            <button>입력</button>
          </div>
        </div>
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
