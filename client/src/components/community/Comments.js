import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import port from "../../data/port.json";

const Comments = ({ postId }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    loadComments();
  }, []);

  //dummy
  const loadComments = async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1/comments"
    );
    console.log(result.data);
    setCommentList(result.data);
  };

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
          {commentList.map((it) => {
            return (
              <div
                key={it.id}
                style={{ border: "1px solid gray", margin: 10 + "px" }}
              >
                <h4>{it.body}</h4>
                <div>
                  <button>좋아요</button>
                  <button>싫어요</button>
                  <button>대댓글</button>
                </div>
              </div>
            );
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
