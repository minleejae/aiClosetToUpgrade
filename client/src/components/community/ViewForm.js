import React from "react";
import { useNavigate } from "react-router-dom";

const ViewForm = ({ postType }) => {
  const navigate = useNavigate();
  console.log("ViewForm!", postType);
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
            <img
              src="https://t1.daumcdn.net/cfile/tistory/996333405A8280FC23"
              alt="temp"
              style={{ width: 80 + "%" }}
            />
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
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ marginRight: "2%" }}
          >
            수정하기
          </button>
          <button
            type="button"
            className="btn btn-danger"
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

export default ViewForm;
