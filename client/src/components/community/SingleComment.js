import React, { useEffect, useState } from "react";
import LikeDislikes from "./LikeDislikes";
import axios from "axios";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import ReplyComment from "./ReplyComment";

const SingleComment = ({ comment, postId, getPost }) => {
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(() => {
    console.log(comment);
    console.log(commentValue);
  }, [commentValue]);

  const onClickReplyOpen = () => {
    console.log("replySubmit:", postId, comment.shortId);
    setOpenReply(!openReply);
  };

  const onHandleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("replySubmit:", postId, comment.shortId);
    const result = await axios.post(
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
    setCommentValue("");
    console.log(result);
  };

  return (
    <>
      <div>
        <div
          key={comment._id}
          style={{ border: "1px solid gray", margin: 10 + "px" }}
        >
          <h5>작성자:{comment.author.name}</h5>
          <h3>내용:{comment.comment}</h3>
          <h4>comment.shortId: {comment.shortId}</h4>
          <div style={{ display: "flex" }}>
            {/* <LikeDislikes comment userId={123} commentId={123} /> */}
            <button onClick={onClickReplyOpen}>대댓글</button>
          </div>
        </div>
        <ReplyComment
          comments={comment.comments}
          postId={postId}
          parentCommentId={comment.shortId}
        />
      </div>
      {openReply && (
        <div style={{ display: "flex" }}>
          <form style={{ display: "flex" }}>
            <input
              type="text"
              className="form-control"
              value={commentValue}
              name="recomment"
              id="recomment"
              placeholder="댓글을 입력해주세요."
              style={{ minWidth: 300 + "%" }}
              onChange={(e) => {
                onHandleChange(e);
              }}
            />
            <input
              type="submit"
              value="댓글입력"
              onClick={(e) => {
                onSubmit(e);
              }}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default SingleComment;
