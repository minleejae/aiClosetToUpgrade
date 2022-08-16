import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";
import $ from "jquery";

const MarketUpdateForm = ({ postType, images }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const paramsId = useParams().id;
  const [curPost, setCurPost] = useState(null);
  const [myPost, setMyPost] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    price: "",
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const post = await axios.get(port.url + `/api/market/list/${paramsId}`, {
      headers: { accessToken: cookies.userData.accessToken },
    });
    setCurPost(post.data);
    setMyPost(post.data.author.email === cookies.userData.email);
    setPostForm({
      title: post.data.title,
      content: post.data.content,
      price: post.data.price,
    });
  };

  //수정하기 클릭시 이벤트
  const handleUpdateSubmitButton = async () => {
    if (postForm.title.trim() === "") {
      alert("제목을 입력해주세요!");
      $("#title").focus();
      return;
    }

    if (postType === 3 && postForm.price === "") {
      alert("가격을 입력해주세요!");
      $("#price").focus();
      return;
    }

    console.log(postForm.price);
    if (postType === 3 && (postForm.price + "").trim() === "") {
      alert("가격을 입력해주세요!");
      $("#price").focus();
      return;
    }

    if (postType === 3 && isNaN(postForm.price)) {
      alert("가격을 숫자로 입력해주세요!");
      $("#price").focus();
      return;
    }

    if (postForm.content.trim() === "") {
      alert("내용을 입력해주세요!");
      $("#content").focus();
      return;
    }

    try {
      await axios.put(
        port.url + `/api/market/list/${paramsId}/update`,
        {
          title: postForm.title,
          content: postForm.content,
          price: postForm.price,
        },
        {
          headers: { accessToken: cookies.userData.accessToken },
        }
      );
    } catch (e) {
      console.log(e);
    }
    navigate("/market");
    window.location.reload();
  };

  //글 삭제하기 버튼 클릭시 이벤트
  const handleRemoveButton = async () => {
    try {
      await axios.delete(port.url + `/api/market/list/${paramsId}/delete`, {
        headers: { accessToken: cookies.userData.accessToken },
      });
    } catch (e) {
      console.log(e);
    }
    navigate("/market");
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
            <label htmlFor="price" className="form-label">
              가격
            </label>
            <input
              type="text"
              className="form-control"
              value={postForm.price}
              name="price"
              id="price"
              placeholder="가격을 입력해주세요."
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              내용
            </label>
            <textarea
              className="form-control"
              name="content"
              value={postForm.content}
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

const mapStateToProps = ({ marketImages }) => {
  return {
    images: marketImages.items,
  };
};

export default connect(mapStateToProps)(MarketUpdateForm);
