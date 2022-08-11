import React from "react";

const ReplyComment = ({ comments, postId, parentCommentId }) => {
  return (
    <div>
      {comments.map((it) => {
        // console.log("it:", it);
        // console.log("test", parentCommentId, it.parentment_id, it.comment);
        return (
          <div
            key={it._id}
            style={{
              border: "1px solid gray",
              margin: 10 + "px",
              marginLeft: 100 + "px",
            }}
          >
            <h5>작성자:{it.author.name}</h5>
            <h3>내용:{it.comment}</h3>
            <div style={{ display: "flex" }}>
              {/* <LikeDislikes comment userId={123} commentId={123} /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReplyComment;
