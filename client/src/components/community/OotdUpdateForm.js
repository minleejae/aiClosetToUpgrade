import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";
import $ from "jquery";

const OotdUpdateForm = ({ postType, images }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const paramsId = useParams().id;
  const [curPost, setCurPost] = useState(null);
  const [myPost, setMyPost] = useState(false);
  const [postForm, setPostForm] = useState({ title: "", content: "" });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const post = await axios.get(port.url + `/api/posts/list/${paramsId}`, {
      headers: { accessToken: cookies.userData.accessToken },
    });
    setCurPost(post.data);
    setMyPost(post.data.author.email === cookies.userData.email);
    setPostForm({ title: post.data.title, content: post.data.content });
  };

  //수정하기 클릭시 이벤트
  const handleUpdateSubmitButton = async () => {
    if (postForm.title.trim() === "") {
      alert("제목을 입력해주세요!");
      $("#title").focus();
      return;
    }

    if (postForm.content.trim() === "") {
      alert("내용을 입력해주세요!");
      $("#content").focus();
      return;
    }

    try {
      await axios.put(
        port.url + `/api/posts/list/${paramsId}/update`,
        {
          title: postForm.title,
          content: postForm.content,
        },
        {
          headers: { accessToken: cookies.userData.accessToken },
        }
      );
    } catch (e) {
      console.log(e);
    }
    navigate("/board");
  };

  //글 삭제하기 버튼 클릭시 이벤트
  const handleRemoveButton = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      alert("취소 했습니다.");
      return;
    }

    try {
      await axios.delete(port.url + `/api/posts/list/${paramsId}/delete`, {
        headers: { accessToken: cookies.userData.accessToken },
      });
    } catch (e) {
      console.log(e);
    }
    alert("게시글을 삭제했습니다.");
    navigate("/board");
    window.location.reload();
  };

  const handleChange = (e) => {
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
            {curPost && (
              <img
                src={port.url + "/" + curPost?.img.url.split("/")[1]}
                alt="temp"
                style={{ width: 80 + "%" }}
              />
            )}
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
              value={postForm.content}
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
