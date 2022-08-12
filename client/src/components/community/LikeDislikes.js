import React, { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import axios from "axios";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";

const LikeDislikes = ({ keyId, urlType }) => {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const url = `${urlType}=${keyId}`;

  console.log(`/api/like/getlikes?${url}`, keyId);

  useEffect(() => {
    axios
      .get(port.url + `/api/like/getlikes?${url}`, {
        headers: { accessToken: cookies.userData.accessToken },
      })
      .then((response) => {
        //0, 0 일떄
        if (response.data.length === 0) {
          setLikes(0);
        } else {
          setLikes(response.data.length);
          //내가 이미 그 좋아요를 눌렀는지 확인
          response.data.forEach((like) => {
            if (like === cookies.userData.email) {
              setLikeAction("liked");
            }
          });
        }
      });

    axios
      .get(port.url + `/api/like/getdislikes?${url}`, {
        headers: { accessToken: cookies.userData.accessToken },
      })
      .then((response) => {
        //0, 0 일떄
        if (response.data.length === 0) {
          setDislikes(0);
        } else {
          setDislikes(response.data.length);
          //내가 이미 그 좋아요를 눌렀는지 확인
          response.data.forEach((like) => {
            if (like === cookies.userData.email) {
              setDisLikeAction("disliked");
            }
          });
        }
      });
  }, [Likes, Dislikes, LikeAction, DisLikeAction]);

  const clickLikeBtn = () => {
    axios
      .post(
        port.url + `/api/like/uplike`,
        { [urlType]: keyId },
        {
          headers: { accessToken: cookies.userData.accessToken },
        }
      )
      .then((res) => {
        if (res.data.liked) {
          setLikes(Likes + 1);
          setDisLikeAction(null);
          setLikeAction("liked");
        } else {
          setLikes(Dislikes - 1);
          setLikeAction(null);
        }
      });
  };

  const clickDisLikeBtn = () => {
    axios
      .post(
        port.url + `/api/like/updislike`,
        { [urlType]: keyId },
        {
          headers: { accessToken: cookies.userData.accessToken },
        }
      )
      .then((res) => {
        if (res.data.disliked) {
          setLikeAction(null);
          setDislikes(Dislikes + 1);
          setDisLikeAction("disliked");
        } else {
          setDislikes(Dislikes - 1);
          setDisLikeAction(null);
        }
      });
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
