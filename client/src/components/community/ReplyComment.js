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
    await axios.delete(port.url + `/api/comment/delete/${comment.shortId}`, {
      headers: { accessToken: cookies.userData.accessToken },
    });
    getPost();
  };

  return (
    <div
      key={comment._id}
      style={{
        border: "1px solid gray",
        margin: 10 + "px",
        marginLeft: 100 + "px",
      }}
    >
      {commentUpdateState ? (
        <>
          <form>
            <input
              type="text"
              className="form-control"
              value={commentUpdating}
              name="recomment"
              id="recomment"
              placeholder="댓글을 입력해주세요."
              style={{ minWidth: 200 + "px" }}
              onChange={(e) => {
                setCommentUpdating(e.target.value);
              }}
            />
            <input
              type="submit"
              value="댓글 수정"
              onClick={(e) => {
                commentUpdateSubmit(e);
              }}
            />
          </form>
        </>
      ) : (
        <>
          <h5>작성자:{comment.author.name}</h5>
          <h3>{comment.show ? `${comment.comment}` : "삭제된 댓글입니다."}</h3>
          <div style={{ display: "flex" }}>
            {comment.show && (
              <LikeDislikes keyId={comment.shortId} urlType={"downmentId"} />
            )}
            {cookies.userData.email === comment.author.email && comment.show && (
              <>
                <button
                  onClick={() => {
                    setCommentUpdateState(true);
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    commentDelete();
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default ReplyComment;
