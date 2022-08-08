import React, { useState, useEffect } from "react";
import UploadImage from "../closetUtils/UploadImage";
import { useNavigate } from "react-router-dom";
const WritingForm = ({ postType }) => {
  const [postForm, setPostForm] = useState({});

  const navigate = useNavigate();
  const onChangeHandler = (event) => {
    const newPostForm = { ...postForm };
    newPostForm[event.target.name] = event.target.value;
    setPostForm(newPostForm);
  };

  useEffect(() => {
    console.log(postForm);
  });

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
            <UploadImage postType={postType} postForm={postForm}></UploadImage>
          </div>
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
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ marginRight: "2%" }}
            onClick={() => {
              console.log("button Click");
            }}
          >
            글쓰기
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingForm;
