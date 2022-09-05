import React, { useState } from "react";
import { useCookies } from "react-cookie";
import LikeDislikes from "./LikeDislikes";
import axios from "axios";
import port from "../../data/port.json";

const ReplyComment = ({ comment, postId, parentCommentId, getPost }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [commentUpdateState, setCommentUpdateState] = useState(false);
  const [commentUpdating, setCommentUpdating] = useState(comment.comment);

  const commentUpdateSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      port.url + `/api/comment/update/${comment.shortId}`,
      {
        content: commentUpdating,
      },
      { headers: { accessToken: cookies.userData.accessToken } }
    );
    setCommentUpdateState(false);
    getPost();
  };

  const commentDelete = async () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) {
      alert("취소 했습니다.");
      return;
    }

    await axios.delete(port.url + `/api/comment/delete/${comment.shortId}`, {
      headers: { accessToken: cookies.userData.accessToken },
    });
    getPost();
    alert("댓글을 삭제했습니다.");
  };

  return (
    <div
      key={comment._id}
      style={{
        width: 90 + "%",
        marginLeft: 10 + "%",
      }}
      className="col-md-11 col-lg-9 col-xl-7 d-flex flex-start mb-1 card w-90 card-body"
    >
      {commentUpdateState ? (
        <form>
          <input
            type="text"
            className="form-control"
            value={commentUpdating}
            name="recomment"
            id="recomment"
            placeholder="댓글을 입력해주세요."
            onChange={(e) => {
              setCommentUpdating(e.target.value);
            }}
          />
          <input
            type="submit"
            value="댓글 수정"
            className="btn btn-outline-success"
            onClick={(e) => {
              e.preventDefault();
              if (commentUpdating.trim() === "") {
                alert("댓글을 입력해주세요.");
                return;
              }
              commentUpdateSubmit(e);
            }}
          />
        </form>
      ) : (
        <>
          <h5>{comment.author.name}</h5>
          <h4>{comment.show ? `${comment.comment}` : "삭제된 댓글입니다."}</h4>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ display: "flex" }}
          >
            {comment.show && (
              <LikeDislikes keyId={comment.shortId} urlType={"downmentId"} />
            )}
            {cookies.userData.email === comment.author.email && comment.show && (
              <div style={{ marginLeft: "-30px" }}>
                <button
                  onClick={() => {
                    setCommentUpdateState(true);
                  }}
                  className="btn btn-outline-success"
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    commentDelete();
                  }}
                  className="btn btn-outline-danger"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default ReplyComment;
