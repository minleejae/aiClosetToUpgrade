import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import port from "../../data/port.json";
import LikeDislikes from "./LikeDislikes";
import $ from "jquery";
import SingleComment from "./SingleComment";

//comments 구조 수정 필요
const Comments = ({ postId, curPost, getPost }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(curPost.comments);
  const commentRef = useRef();

  useEffect(() => {
    setComments(curPost.comments);
  }, [curPost]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      alert("댓글을 입력해주세요.");
      $("#comment").focus();
      return;
    }

    const result = await axios.post(
      port.url + `/api/market/list/${postId}/comment`,
      {
        comment,
      },
      {
        headers: { accessToken: cookies.userData.accessToken },
      }
    );
    await getPost().then((res) => {
      setComment("");
    });
  };

  // 새로운 댓글을 입력할 때 변화 감지 함수
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <div className="comments">
        {comments.map((comment, index) => {
          return (
            <SingleComment
              key={comment._id}
              comment={comment}
              postId={postId}
              getPost={getPost}
            />
          );
        })}
      </div>
      <div style={{ display: "flex" }}>
        <form style={{ display: "flex", width: "100%" }}>
          <input
            type="text"
            className="form-control"
            value={comment}
            name="comment"
            id="comment"
            placeholder="댓글을 입력해주세요."
            style={{ width: "100%" }}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="submit"
            value="댓글입력"
            className="btn btn-outline-primary"
            onClick={(e) => {
              handleCommentSubmit(e);
            }}
          />
        </form>
      </div>
    </>
  );
};

export default Comments;
