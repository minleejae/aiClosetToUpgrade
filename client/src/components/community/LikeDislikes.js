import React, { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import axios from "axios";
import port from "../../data/port.json";
const LikeDislikes = (props) => {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);

  let variable = {};

  if (props.comment) {
    variable = { commentId: props.commentId, userId: props.userId };
  } else {
    variable = { postId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    axios.post(port.url + "/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 좋아요를 받았는지
        setLikes(response.data.likes.length);

        //내가 이미 그 좋아요를 눌렀는지 확인
        response.data.likes.forEach((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Likes에 정보를 가져오지 못했습니다.");
      }
    });

    //post userId, (postId or commentId)

    //한 댓글에 좋아요 눌러져 있는 정보 (누른 사람들, 갯수)
    //getLikes
    //getDisLikes

    //댓글에 좋아요를 누를때랑 싫어요 누를때
    //uplike
    //unlike
    //updislike
    //undislike

    axios.post(port.url + "/api/like/getDisikes", variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 좋아요를 받았는지
        setLikes(response.data.dislikes.length);

        //내가 이미 그 좋아요를 눌렀는지 확인
        response.data.dislikes.forEach((dislike) => {
          if (dislike.userId === props.userId) {
            setDisLikeAction("disliked");
          }
        });
      } else {
        alert("DisLikes에 정보를 가져오지 못했습니다.");
      }
    });
  });

  const clickLikeBtn = () => {
    console.log("like!");
  };

  const clickDisLikeBtn = () => {
    console.log("dislike!");
  };

  return (
    <div>
      <button
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={clickLikeBtn}
      >
        {LikeAction ? (
          <ThumbUpAltIcon color="primary"></ThumbUpAltIcon>
        ) : (
          <ThumbUpOffAltIcon color="primary"></ThumbUpOffAltIcon>
        )}
        <span> {Likes}</span>
      </button>
      <button
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={clickDisLikeBtn}
      >
        {DisLikeAction ? (
          <ThumbDownAltIcon color="error"></ThumbDownAltIcon>
        ) : (
          <ThumbDownOffAltIcon color="error"></ThumbDownOffAltIcon>
        )}
        <span> {Dislikes}</span>
      </button>
    </div>
  );
};

export default LikeDislikes;
