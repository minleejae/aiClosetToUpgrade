import React, { useEffect, useState } from "react";
import LikeDislikes from "./LikeDislikes";
import axios from "axios";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import ReplyComment from "./ReplyComment";

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
    await axios.delete(port.url + `/api/comment/delete/${comment.shortId}`, {
      headers: { accessToken: cookies.userData.accessToken },
    });
    getPost();
  };

  return (
    <>
      <div>
        <div
          key={comment._id}
          style={{ border: "1px solid gray", margin: 10 + "px" }}
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
              <h3>
                {comment.show ? `${comment.comment}` : "삭제된 댓글입니다."}
              </h3>

              <div style={{ display: "flex" }}>
                {comment.show && (
                  <LikeDislikes keyId={comment.shortId} urlType={"upmentId"} />
                )}
                <button onClick={onClickReplyOpen}>대댓글</button>
                {cookies.userData.email === comment.author.email &&
                  comment.show && (
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
        <div style={{ display: "flex", marginLeft: 100 + "px" }}>
          <form style={{ display: "flex" }}>
            <input
              type="text"
              className="form-control"
              value={commentValue}
              name="recomment"
              id="recomment"
              placeholder="대댓글을 입력해주세요."
              style={{ minWidth: 300 + "%" }}
              onChange={(e) => {
                onHandleChange(e);
              }}
            />
            <input
              type="submit"
              value="댓글입력"
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
