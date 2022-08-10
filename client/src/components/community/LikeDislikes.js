import React, { useEffect } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import axios from "axios";
import port from "../../data/port.json";
const LikeDislikes = (props) => {
  let variable = {};

  if (props.comment) {
    variable = { commentId: props.commentId, userId: props.userId };
  } else {
    variable = { postId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    // axios.post(port.url + "/api/like/getLikes", variable).then((response) => {
    //   if (response.data.success) {
    //   } else {
    //     alert("Likes에 정보를 가져오지 못했습니다.");
    //   }
    // });
  });

  const clickLikeBtn = () => {
    console.log("like!");
  };

  const clickDisLikeBtn = () => {
    console.log("dislike!");
  };

  return (
    <div>
      LikeDislikes
      <button
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={clickLikeBtn}
      >
        <ThumbUpOffAltIcon color="primary"></ThumbUpOffAltIcon>
        <span> 1</span>
      </button>
      <button
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={clickDisLikeBtn}
      >
        <ThumbDownOffAltIcon color="error"></ThumbDownOffAltIcon>
        <span> </span>
      </button>
    </div>
  );
};

export default LikeDislikes;
