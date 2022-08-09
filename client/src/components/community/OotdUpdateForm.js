import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";

const OotdUpdateForm = ({ postType, images }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const paramsId = useParams().id;
  const [curPost, setCurPost] = useState(null);
  const [myPost, setMyPost] = useState(false);
  const [postForm, setPostForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const searchPost = images.find((image) => {
      return paramsId === image.shortId;
    });
    console.log(searchPost);
    //나의 게시물인 경우에만 수정
    setMyPost(searchPost.author.email === cookies.userData.email);
    setCurPost(searchPost);
    setPostForm({ title: searchPost.title, content: searchPost.content });
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

  const handleUpdateSubmitButton = async () => {
    try {
      await axios.put(port.url + `/market/list/${paramsId}/update`, {
        title: postForm.title,
        content: postForm.content,
      });
    } catch (e) {
      console.log(e);
    }

    navigate("/board");
  };

  const handleRemoveButton = async () => {
    try {
      await axios.get(port.url + `/api/posts/list/${paramsId}/delete`);
    } catch (e) {
      console.log(e);
    }
    navigate("/board");
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const newPostForm = { ...postForm };
    newPostForm[e.target.name] = e.target.value;
    setPostForm({ ...newPostForm });
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
            <label htmlFor="title" className="form-label">
              제목
            </label>
            <input
              type="text"
              value={postForm.title}
              className="form-control"
              name="title"
              id="title"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              내용
            </label>
            <textarea
              className="form-control"
              name="content"
              id="content"
              rows="3"
              onChange={(e) => {
                handleChange(e);
              }}
            ></textarea>
          </div>
          {myPost ? (
            <>
              <button
                type="button"
                className="btn btn-outline-primary"
                style={{ marginRight: "2%" }}
                onClick={() => {
                  handleUpdateSubmitButton();
                }}
              >
                수정완료
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
      </div>
    </div>
  );
};

const mapStateToProps = ({ ootdImages }) => {
  return {
    images: ootdImages.items,
  };
};

export default connect(mapStateToProps)(OotdUpdateForm);
