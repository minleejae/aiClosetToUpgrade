import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import port from "../../data/port.json";
import { useCookies } from "react-cookie";
import axios from "axios";
import Comments from "./Comments";
import styled from "styled-components";
import PostContainer from "./PostContainer";
const SectionComponent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 100px 250px 200px;

  @media screen and (max-width: 1400px) {
    padding: 100px 150px 150px;
  }

  @media screen and (max-width: 1200px) {
    padding: 100px 50px 100px;
  }

  @media screen and (max-width: 768px) {
    padding: 100px 0 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  row-gap: 5px;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: repeat(4, auto);
`;

const BoardCategory = styled.span`
  grid-column: 2/3;
  grid-row: 1/2;
  align-self: end;
  font-size: calc(20px + 1vw);
  color: gray;
`;

const ImageContainer = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  width: 100%;
  border: 1px solid gray;
  color: gray;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 1%;
`;

const LeftArrowContainer = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
  display: flex;
  margin: auto;
  color: silver;
  &:hover {
    color: black;
    cursor: pointer;
  }
  font-size: calc(50px + 8vw);
`;

const RightArrowContainer = styled.div`
  grid-column: 3/4;
  grid-row: 2/3;
  display: flex;
  margin: auto;
  color: silver;
  &:hover {
    color: black;
    cursor: pointer;
  }
  font-size: calc(50px + 8vw);
`;

const PostDiv = styled.div`
  grid-column: 2/3;
  grid-row: 3/4;
`;

const CommentContainer = styled.div`
  grid-column: 2/3;
  grid-row: 4/5;
`;

const OotdViewForm = ({ postType }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const paramsId = useParams().id;
  const [curPost, setCurPost] = useState(null);
  const [myPost, setMyPost] = useState(false);
  const [nextPost, setNextPost] = useState(null);
  const [prePost, setPrePost] = useState(null);

  useEffect(() => {
    getPost();
    getPrePost();
    getNextPost();
  }, []);

  const getPost = async () => {
    const post = await axios.get(port.url + `/api/posts/list/${paramsId}`, {
      headers: { accessToken: cookies.userData.accessToken },
    });
    setCurPost(post.data);
    setMyPost(post.data.author.email === cookies.userData.email);
  };

  const getPrePost = async () => {
    const prev = await axios.get(
      port.url + `/api/movepost/prevpost?shortId=${paramsId}&postType=2`,
      {
        headers: { accessToken: cookies.userData.accessToken },
      }
    );
    setPrePost(prev.data.targetData?.shortId);
  };

  const getNextPost = async () => {
    const nxt = await axios.get(
      port.url + `/api/movepost/nextpost?shortId=${paramsId}&postType=2`,
      {
        headers: { accessToken: cookies.userData.accessToken },
      }
    );
    setNextPost(nxt.data.targetData?.shortId);
  };

  return (
    <>
      <SectionComponent>
        <GridContainer>
          <BoardCategory>OOTD</BoardCategory>
          <ImageContainer>
            {curPost && (
              <img
                src={port.url + "/" + curPost?.img.url.split("/")[1]}
                alt="post"
                style={{ width: "100%", objectFit: "cover" }}
              />
            )}
          </ImageContainer>
          <LeftArrowContainer>
            {nextPost && (
              <i
                className="fa-solid fa-angle-left"
                onClick={() => {
                  navigate("/board/" + nextPost);
                  window.location.reload();
                }}
              ></i>
            )}
          </LeftArrowContainer>
          <RightArrowContainer>
            {prePost && (
              <i
                className="fa-solid fa-angle-right"
                onClick={() => {
                  navigate("/board/" + prePost);
                  window.location.reload();
                }}
              ></i>
            )}
          </RightArrowContainer>
          <PostDiv>
            {curPost && (
              <PostContainer
                curPost={curPost}
                myPost={myPost}
                paramsId={paramsId}
              />
            )}
          </PostDiv>
          <CommentContainer>
            {curPost && (
              <Comments
                postId={paramsId}
                curPost={curPost}
                getPost={getPost}
              ></Comments>
            )}
          </CommentContainer>
        </GridContainer>
      </SectionComponent>
    </>
  );
};

const mapStateToProps = ({ ootdImages }) => {
  return {
    images: ootdImages.items,
  };
};

export default connect(mapStateToProps)(OotdViewForm);
