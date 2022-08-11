import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import port from "../../data/port.json";
import LikeDislikes from "./LikeDislikes";
import SingleComment from "./SingleComment";

//comments 구조 수정 필요
const Comments = ({ postId, curPost, getPost }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(curPost.comments);

  useEffect(() => {
    setComments(curPost.comments);
  }, [curPost]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
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
      <div className="album container">
        <div>Comments</div>
        <label htmlFor="comment" className="form-label">
          댓글
        </label>
        <div className="comments">
          {comments.map((it, index) => {
            return <SingleComment key={index} it={it} postId={postId} />;
          })}
        </div>
        <div style={{ display: "flex" }}>
          <form style={{ display: "flex" }}>
            <input
              type="text"
              className="form-control"
              value={comment}
              name="comment"
              id="comment"
              placeholder="댓글을 입력해주세요."
              style={{ minWidth: 300 + "%" }}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="submit"
              value="댓글입력"
              onClick={(e) => {
                handleCommentSubmit(e);
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Comments;
