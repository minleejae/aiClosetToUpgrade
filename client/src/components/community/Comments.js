import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import port from "../../data/port.json";
import LikeDislikes from "./LikeDislikes";
import SingleComment from "./SingleComment";

//comments 구조 수정 필요
const Comments = ({ postId, curPost }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log("curPost", curPost);
  }, []);

  const handleClick = async (e) => {
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
    setComment("");
    console.log(result);
  };
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
          {curPost?.comments.map((it, index) => {
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
                handleClick(e);
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Comments;
