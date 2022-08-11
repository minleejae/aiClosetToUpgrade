import React, { useEffect, useState } from "react";
import LikeDislikes from "./LikeDislikes";
import axios from "axios";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import ReplyComment from "./ReplyComment";

const SingleComment = ({ it, postId }) => {
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

  const onHandleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = async (e, shortId) => {
    e.preventDefault();
    console.log("replySubmit:", postId, shortId);
    const result = await axios.post(
      //게시물 , 원래 댓글
      port.url + `/api/market/list/${postId}/recomment/${shortId}`,
      {
        commentValue,
      },
      {
        headers: { accessToken: cookies.userData.accessToken },
      }
    );
    setCommentValue("");
    console.log(result);
  };

  return (
    <>
      <div>
        <div
          key={it._id}
          style={{ border: "1px solid gray", margin: 10 + "px" }}
        >
          <h5>작성자:{it.author.name}</h5>
          <h3>내용:{it.comment}</h3>
          <div style={{ display: "flex" }}>
            {/* <LikeDislikes comment userId={123} commentId={123} /> */}
            <button onClick={onClickReplyOpen}>대댓글</button>
          </div>
        </div>
        <ReplyComment
          comments={it.comments}
          postId={postId}
          parentCommentId={it.shortId}
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
                onSubmit(e, it.shortId);
              }}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default SingleComment;
