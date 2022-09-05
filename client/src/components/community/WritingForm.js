import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import DressClassifier from "../closetUtils/DressClassifier";
import port from "./../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";
import $ from "jquery";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const pageTitle = ["CLOSET", "OOTD", "MARKET"];

const requestUrl = [
  "/api/closet/create",
  "/api/posts/create",
  "/api/market/create",
];

const afterSubmitUrl = ["/closet", "/board", "/market"];

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
  height: 100%;
  display: flex;
`;

const ArrowDiv = styled.div`
  width: 10vw;
  height: 10vw;
  display: flex;
`;

const ImageDiv = styled.div`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const WritingForm = ({
  uploadActive,
  setUploadActive,
  postType,
  postFormpostType,
}) => {
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    price: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [selectedFile, setSelectedFile] = useState(null);
  //현재 선택된 이미지의 source state
  const [imgSrc, setImgSrc] = useState(null);
  //upload 버튼 여러번 클릭되는 것을 방지하기 위한 state
  const [uploadButtonClicked, setUploadButtonClicked] = useState(false);

  useEffect(() => {}, [selectedFile, uploadButtonClicked]);

  const navigate = useNavigate();
  const onChangeHandler = (event) => {
    const newPostForm = { ...postForm };
    newPostForm[event.target.name] = event.target.value;
    setPostForm(newPostForm);
  };

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setImgSrc(reader.result);
      setSelectedFile(file);
    };
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();

    if (selectedFile == null) {
      alert("이미지를 선택해주세요!");
      return;
    }

    if (postType === 2 || postType === 3) {
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
    }

    //버튼 여러번 클릭하는 것 차단
    setUploadButtonClicked(true);

    //이미지 분류 typeExample: {dressType: 'TOP', styleType: 'CASUAL'}

    //axios로 image파일 서버로 전송하기
    const formData = new FormData();
    formData.append("img", selectedFile);
    formData.append("email", cookies.userData.email);
    formData.append("postType", postType);

    //옷장에서만 tensorflow 이용하여 이미지 분류해서 type을 넘겨줌
    if (postType === 1) {
      const type = await DressClassifier(
        document.getElementById("previewImage")
      );
      console.log(type);
      formData.append("type", JSON.stringify(type));
    } else if (postType === 2 || postType === 3) {
      formData.append("title", postForm.title);
      formData.append("content", postForm.content);

      if (postType === 3) {
        formData.append("price", postForm.price);
      }
    }

    //파일 data 서버로 post
    await axios
      .post(port.url + requestUrl[postType - 1], formData, {
        headers: { accessToken: cookies.userData.accessToken },
      })
      .then((res) => {
        navigate(afterSubmitUrl[postType - 1]);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TitleContainer>
            <TItleDiv>{pageTitle[postType - 1]}</TItleDiv>
          </TitleContainer>
          <div style={{ display: "flex" }}>
            <ContainerDiv>
              <ArrowDiv></ArrowDiv>
              <ImageDiv>
                <div
                  id="uploadBox"
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <img
                    id="previewImage"
                    src={imgSrc || require("./top1.jpg")}
                    alt="preview"
                    style={{
                      width: "48vw",
                      height: "36vw",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                  />
                  {uploadButtonClicked && (
                    <CircularProgress style={{}}></CircularProgress>
                  )}
                  <form
                    onSubmit={(e) => {
                      fileUploadHandler(e);
                    }}
                    encType="multipart/form-data"
                    style={{
                      width: "70%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => fileSelectedHandler(e)}
                      className="form-control mb-3"
                      name="photo"
                    />

                    <div>
                      {postType === 1 ? (
                        <></>
                      ) : (
                        <>
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                              제목
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              id="title"
                              placeholder="제목을 입력해주세요."
                              onChange={onChangeHandler}
                            />
                            {postType === 3 ? (
                              <>
                                <label htmlFor="price" className="form-label">
                                  가격
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="price"
                                  id="price"
                                  placeholder="가격을 입력해주세요."
                                  onChange={onChangeHandler}
                                />
                              </>
                            ) : undefined}
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
                              onChange={onChangeHandler}
                            ></textarea>
                          </div>
                        </>
                      )}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <input
                          type="submit"
                          value="제출"
                          className="btn btn-outline-primary"
                          style={{ marginRight: "2%" }}
                          disabled={uploadButtonClicked}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => navigate(-1)}
                        >
                          뒤로가기
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </ImageDiv>
              <ArrowDiv></ArrowDiv>
            </ContainerDiv>
          </div>
        </div>
      </>
    </div>
  );
};

export default WritingForm;
