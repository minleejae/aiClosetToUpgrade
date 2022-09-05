import React, { useEffect, useState } from "react";
import LikeDislikes from "./LikeDislikes";
import axios from "axios";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import ReplyComment from "./ReplyComment";
import $ from "jquery";

const SingleComment = ({ comment, postId, getPost }) => {
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentUpdateState, setCommentUpdateState] = useState(false);
  const [commentUpdating, setCommentUpdating] = useState(comment.comment);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(() => {}, [commentValue]);

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

  const onHandleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onReplySubmit = async (e) => {
    e.preventDefault();
    if (commentValue.trim() === "") {
      alert("댓글을 입력해주세요.");
      $("#recomment").focus();
      return;
    }

    await axios.post(
      //게시물 , 원래 댓글
      port.url + `/api/market/list/${postId}/recomment/${comment.shortId}`,
      {
        comment: commentValue,
      },
      {
        headers: { accessToken: cookies.userData.accessToken },
      }
    );
    getPost();
    setOpenReply(false);
    setCommentValue("");
  };

  const commentUpdateSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.put(
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
    <>
      <div>
        <div
          key={comment._id}
          style={{ width: "100%" }}
          className="col-md-11 col-lg-9 col-xl-7 d-flex flex-start mb-1 card card-body"
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
            </>
          ) : (
            <>
              <h5>{comment.author.name}</h5>
              <h4>
                {comment.show ? `${comment.comment}` : "삭제된 댓글입니다."}
              </h4>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "start",
                }}
              >
                {comment.show && (
                  <LikeDislikes keyId={comment.shortId} urlType={"upmentId"} />
                )}
                <div>
                  {cookies.userData.email === comment.author.email &&
                    comment.show && (
                      <>
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
                      </>
                    )}
                  <button
                    onClick={onClickReplyOpen}
                    className="btn btn-outline-dark"
                  >
                    <i className="fas fa-reply me-1"></i> Re
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {comment.comments.length > 0 &&
          comment.comments.map((it) => {
            return (
              <ReplyComment
                key={it._id}
                comment={it}
                postId={postId}
                parentCommentId={comment.shortId}
                getPost={getPost}
              />
            );
          })}
      </div>
      {openReply && (
        <div
          style={{ display: "flex", marginLeft: 10 + "%", marginBottom: "5px" }}
        >
          <form style={{ display: "flex", width: "100%" }}>
            <input
              type="text"
              className="form-control"
              value={commentValue}
              name="recomment"
              id="recomment"
              placeholder="대댓글을 입력해주세요."
              onChange={(e) => {
                onHandleChange(e);
              }}
            />
            <input
              type="submit"
              value="댓글입력"
              className="btn btn-outline-primary"
              onClick={(e) => {
                onReplySubmit(e);
              }}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default SingleComment;
