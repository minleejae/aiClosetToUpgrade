import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import DressClassifier from "../closetUtils/DressClassifier";
import port from "./../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";

const pageTitle = ["CLOSET", "OOTD", "MARKET"];

const requestUrl = [
  "/api/closet/create",
  "/api/posts/create",
  "/api/market/create",
];

const afterSubmitUrl = ["/closet", "/board", "/market"];

const WritingForm = ({
  uploadActive,
  setUploadActive,
  postType,
  postFormpostType,
}) => {
  const [postForm, setPostForm] = useState({});
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
    //버튼 여러번 클릭하는 것 차단
    setUploadButtonClicked(true);

    //이미지 분류 typeExample: {dressType: 'TOP', styleType: 'CASUAL'}

    //axios로 image파일 서버로 전송하기
    const formData = new FormData();
    formData.append("img", selectedFile);
    formData.append("email", cookies.userData.email);
    formData.append("postType", postType);

    if (postType === 1) {
      const type = await DressClassifier(
        document.getElementById("previewImage")
      );
      formData.append("type", JSON.stringify(type));
      console.log(type);
    } else if (postType === 2 || postType === 3) {
      formData.append("title", postForm.title);
      formData.append("content", postForm.content);

      if (postType === 3) {
        formData.append("price", postForm.price);
      }
    }

    console.log(port.url + requestUrl[postType - 1]);

    //파일 data 서버로 post
    await axios
      .post(port.url + requestUrl[postType - 1], formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate(afterSubmitUrl[postType - 1]);
  };

  return (
    <div style={{ paddingTop: 100 + "px", justifyContent: "center" }}>
      <h1>{pageTitle[postType - 1]}</h1>
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
            <div id="uploadBox">
              업로드화면 {postType}
              {/* row */}
              <img
                id="previewImage"
                src={imgSrc || require("./top1.jpg")}
                alt="preview"
              ></img>
              <form
                onSubmit={(e) => {
                  fileUploadHandler(e);
                }}
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => fileSelectedHandler(e)}
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
                  <input
                    type="submit"
                    className="btn btn-outline-primary"
                    style={{ marginRight: "2%" }}
                    disabled={uploadButtonClicked}
                    onClick={() => {
                      console.log("button Click");
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate(-1)}
                  >
                    뒤로가기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingForm;
