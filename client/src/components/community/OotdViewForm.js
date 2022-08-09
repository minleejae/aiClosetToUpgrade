import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";

const OotdViewForm = ({ postType, images }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const paramsId = useParams().id;
  const [curPost, setCurPost] = useState(null);
  const [myPost, setMyPost] = useState(false);

  useEffect(() => {
    const searchPost = images.find((image) => {
      return paramsId === image.shortId;
    });
    //나의 게시물인 경우에만 수정
    setMyPost(searchPost.author.email === cookies.userData.email);

    //브라우저에서 현재 게시물 정보 저장해서 새로고침해도 볼 수 있도록 저장
    localStorage.setItem("ootd-post", JSON.stringify(searchPost));
    const saved = localStorage.getItem("ootd-post");
    if (saved !== null) {
      setCurPost(JSON.parse(saved));
    } else {
      setCurPost(searchPost);
    }
  }, []);

  const imageTag = curPost ? (
    <img
      src={port.url + "/" + curPost?.img.url.split("/")[1]}
      alt="temp"
      style={{ width: 80 + "%" }}
    />
  ) : (
    <></>
  );

  const handleUpdateButton = () => {
    navigate("update");
  };
  const handleRemoveButton = async () => {
    try {
      await axios.get(port.url + `/api/posts/list/${paramsId}/delete`);
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
            {imageTag}
          </div>
          <div className="mb-3">
            <label htmlFor="title" disabled className="form-label">
              제목
            </label>

            <input
              disabled
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="제목을 입력해주세요."
            />
            {postType === 3 ? (
              <>
                <label htmlFor="price" className="form-label">
                  가격
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  name="price"
                  id="price"
                  placeholder="가격을 입력해주세요."
                />
              </>
            ) : undefined}
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              내용
            </label>
            <textarea
              disabled
              className="form-control"
              name="content"
              id="content"
              rows="3"
            ></textarea>
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

const mapStateToProps = ({ ootdImages }) => {
  return {
    images: ootdImages.items,
  };
};

export default connect(mapStateToProps)(OotdViewForm);
