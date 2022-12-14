import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";
import $ from "jquery";
import styled from "styled-components";

const SectionComponent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 100px 250px 200px;

  @media screen and (max-width: 1400px) {
    padding: 100px 150px 150px;
  }

  @media screen and (max-width: 1200px) {
    padding: 100px 50px 100px;
  }

  @media screen and (max-width: 768px) {
    padding: 100px 0 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  row-gap: 5px;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: repeat(4, auto);
`;

const BoardCategory = styled.span`
  grid-column: 2/3;
  grid-row: 1/2;
  align-self: end;
  font-size: calc(20px + 1vw);
  color: gray;
`;

const ImageContainer = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  width: 100%;
  border: 1px solid gray;
  color: gray;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 1%;
`;

const PostDiv = styled.div`
  grid-column: 2/3;
  grid-row: 3/4;
`;

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

  //???????????? ????????? ?????????
  const handleUpdateSubmitButton = async () => {
    if (postForm.title.trim() === "") {
      alert("????????? ??????????????????!");
      $("#title").focus();
      return;
    }

    if (postType === 3 && postForm.price === "") {
      alert("????????? ??????????????????!");
      $("#price").focus();
      return;
    }

    console.log(postForm.price);
    if (postType === 3 && (postForm.price + "").trim() === "") {
      alert("????????? ??????????????????!");
      $("#price").focus();
      return;
    }

    if (postType === 3 && isNaN(postForm.price)) {
      alert("????????? ????????? ??????????????????!");
      $("#price").focus();
      return;
    }

    if (postForm.content.trim() === "") {
      alert("????????? ??????????????????!");
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

  //??? ???????????? ?????? ????????? ?????????
  const handleRemoveButton = async () => {
    if (!window.confirm("???????????? ?????????????????????????")) {
      alert("?????? ????????????.");
      return;
    }
    try {
      await axios.delete(port.url + `/api/market/list/${paramsId}/delete`, {
        headers: { accessToken: cookies.userData.accessToken },
      });
    } catch (e) {
      console.log(e);
    }
    alert("???????????? ??????????????????.");

    navigate("/market");
  };

  const handleChange = (e) => {
    const newPostForm = { ...postForm };
    newPostForm[e.target.name] = e.target.value;
    setPostForm({ ...newPostForm });
  };

  return (
    <>
      <SectionComponent>
        <GridContainer>
          <BoardCategory>MARKET</BoardCategory>
          <ImageContainer>
            {curPost && (
              <img
                src={port.url + "/" + curPost?.img.url.split("/")[1]}
                alt="post"
                style={{ width: "100%", objectFit: "cover" }}
              />
            )}
          </ImageContainer>
          <PostDiv>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                ??????
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
                ??????
              </label>
              <input
                type="text"
                className="form-control"
                value={postForm.price}
                name="price"
                id="price"
                placeholder="????????? ??????????????????."
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                ??????
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
                  ????????????
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginRight: "2%" }}
                  onClick={() => {
                    handleRemoveButton();
                  }}
                >
                  ????????????
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
              ????????????
            </button>
          </PostDiv>
        </GridContainer>
      </SectionComponent>
    </>
  );
};

const mapStateToProps = ({ marketImages }) => {
  return {
    images: marketImages.items,
  };
};

export default connect(mapStateToProps)(MarketUpdateForm);
