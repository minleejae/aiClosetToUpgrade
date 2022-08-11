import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";
import Comments from "./Comments";

const OotdViewForm = ({ postType }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const paramsId = useParams().id;
  const [curPost, setCurPost] = useState(null);
  const [myPost, setMyPost] = useState(false);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const post = await axios.get(port.url + `/api/posts/list/${paramsId}`, {
      headers: { accessToken: cookies.userData.accessToken },
    });
    setCurPost(post.data);
    setMyPost(post.data.author.email === cookies.userData.email);
  };

  const handleUpdateButton = () => {
    navigate("update");
  };

  const handleRemoveButton = async () => {
    try {
      await axios.post(port.url + `/api/posts/list/${paramsId}/delete`, {
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
            <h6>조회수 : {curPost && curPost.views}</h6>
          </div>
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
        <Comments postId={paramsId}></Comments>
      </div>
    </div>
  );
};

const mapStateToProps = ({ ootdImages }) => {
  return {
    images: ootdImages.items,
  };
};

export default connect(mapStateToProps)(OotdViewForm);
