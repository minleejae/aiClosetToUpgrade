import React, { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import axios from "axios";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
const LikeDislikes = (props) => {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const postId = props.postId;
  console.log("LikeDislike, postId", postId);

  useEffect(() => {
    axios
      .get(port.url + `/api/like/getlikes?postId=${postId}`, {
        headers: { accessToken: cookies.userData.accessToken },
      })
      .then((response) => {
        //0, 0 일떄
        if (response.data.length === 0) {
          setLikes(0);
        } else {
          console.log("Likes", response);
          setLikes(response.data.likes.length);
          //내가 이미 그 좋아요를 눌렀는지 확인
          response.data.likes.forEach((like) => {
            if (like.userId === props.userId) {
              setLikeAction("liked");
            }
          });
        }
      });

    axios
      .get(port.url + `/api/like/getdisikes?postId=${props.commentId}`, {
        headers: { accessToken: cookies.userData.accessToken },
      })
      .then((response) => {
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
    axios
      .post(
        port.url + `/api/like/uplike`,
        { postId },
        {
          headers: { accessToken: cookies.userData.accessToken },
        }
      )
      .then((res) => {
        if (res.data.liked) {
          setLikes(Likes + 1);
          setLikeAction("liked");
        } else {
          setLikes(Likes - 1);
          setLikeAction(null);
        }
      });
  };

  const clickDisLikeBtn = () => {
    console.log("dislike!");
    if (DisLikeAction === null) {
      axios.post(port.url + "/api/like/upDisLike", postId).then((res) => {
        if (res.data.success) {
          setDisLikeAction(Dislikes + 1);
          setDislikes("disliked");

          if (LikeAction !== null) {
            setLikes(Likes - 1);
            setLikeAction(null);
          }
        } else {
          alert("DisLike를 올리지 못했습니다.");
        }
      });
    } else {
      axios.post(port.url + "/api/like/unDisLike", postId).then((res) => {
        if (res.data.success) {
          setDisLikeAction(Dislikes - 1);
          setDislikes("null");
        } else {
          alert("unDisLike를 내리지 못했습니다.");
        }
      });
    }
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
