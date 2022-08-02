import React, { useState, useEffect } from "react";
import UploadImage from "./closetUtils/UploadImage";

const WritingForm = () => {
  return (
    <div>
      <h1>WritingForm</h1>
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
            <UploadImage></UploadImage>
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
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ marginRight: "2%" }}
          >
            리뷰쓰기
          </button>
          <button type="button" className="btn btn-danger">
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingForm;
