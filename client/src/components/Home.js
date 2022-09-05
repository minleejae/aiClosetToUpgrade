import homeImage from "./../images/home.jpeg";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import port from "./../data/port.json";
import { useNavigate } from "react-router-dom";

const StyledContainerDiv = styled.div`
  position: relative;
`;

const PreviewDiv = styled.div`
  width: 100%;
  height: 750px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
`;

const imageMove = keyframes`{
  0% {
      transform: translate(0, 0);
  }
  100% {
      transform: translate(-3330px, 0);
  }
}`;

const ReverseImageMove = keyframes`{
  0% {
      transform: translate(-3330px, 0);
  }
  100% {
      transform: translate(0, 0);
  }
}`;

const RotateImageContainer = styled.div`
  width: 6660px;
  height: 333px;
  position: relative;
  display: flex;
  animation: ${imageMove} 32s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const ReverseRotateImageContainer = styled.div`
  width: 200vw;
  height: 333px;
  position: relative;
  display: flex;
  animation: ${ReverseImageMove} 32s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 12%;
  padding: 1.125rem;
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: white;
  border: 1px solid silver;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  border-radius: 12%;
  &:hover {
    cursor: pointer;
  }
`;

const HomeImage = styled.img`
  width: 100%;
  height: 100vh;
  filter: brightness(30%);

  @media screen and (max-width: 1400px) {
    height: calc(40vw + 200px);
  }
`;

const GirdContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2.5vw;
  width: 100%;
  padding: 8vw 15vw;

  @media screen and (max-width: 1200px) {
    padding: 4vw 10vw;
  }

  @media screen and (max-width: 700px) {
    padding: 3vw 6vw;
  }

  @media screen and (max-width: 530px) {
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: 1fr;
  }
`;

const DescribeTitle = styled.p`
  grid-column: 1/2;
  grid-row: 1/3;
  font-size: calc(2.5vw + 15px);
  margin-bottom: 0;
  line-height: 110%;
  font-weight: bold;
  align-self: start;

  @media screen and (max-width: 530px) {
    font-size: calc(min(9vh, 5vw) + 12px);
  }
`;

const ContentTextContainer = styled.div`
  grid-column: ${(props) => {
    return props.column;
  }};
  grid-row: ${(props) => {
    return props.row;
  }};
  margin-bottom: 0;
  align-self: end;
  line-height: 110%;
  font-size: calc(1.3vw + 11px);

  @media screen and (max-width: 530px) {
    grid-column: 1/2;
    grid-row: ${(props) => {
      return props.responsiveRow;
    }};

    font-size: calc(3vw + 16px);
  }
`;

const ContentTitle = styled.h2`
  font-size: calc(1.3vw + 8px);
  color: gray;
  margin-bottom: 0;
  line-height: 110%;

  @media screen and (max-width: 530px) {
    font-size: calc(3vw + 14px);
  }
`;

const ContentImageContainer = styled.div`
  grid-column: ${(props) => {
    return props.column;
  }};
  grid-row: ${(props) => {
    return props.row;
  }};
  width: 100%;
  border: 1px solid silver;
  border-radius: 8%;
  overflow: hidden;
  box-shadow: 0px 3px 5px -3px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);

  @media screen and (max-width: 530px) {
    grid-column: 1/2;
    grid-row: ${(props) => {
      return props.responsiveRow;
    }};
  }
`;

const PreviewTitle = styled.div`
  padding: 5vw 15vw 0vw;
  font-size: calc(2.5vw + 15px);
  font-weight: bold;

  @media screen and (max-width: 1200px) {
    padding: 4vw 10vw 0vw;
  }

  @media screen and (max-width: 700px) {
    padding: 3vw 6vw 0vw;
  }

  @media screen and (max-width: 530px) {
    font-size: calc(min(9vh, 5vw) + 12px);
  }
`;

const HomeImgContainer = () => {
  return (
    <StyledContainerDiv>
      <HomeImage src={homeImage} alt="home-main" />
      <div
        style={{
          position: "absolute",
          top: 38 + "%",
          left: 5 + "%",
          width: "90%",
        }}
      >
        <h1
          style={{
            fontSize: "calc(min(9vh, 5vw) + 15px)",
            color: "white",
            fontWeight: "bold",
            marginBottom: 1 + "%",
          }}
        >
          Welcome to AI CLOSET!
        </h1>
        <p
          style={{
            fontSize: "calc(min(6vh, 3vw) + 11px)",
            color: "white",
            lineHeight: 110 + "%",
          }}
        >
          AI CLOSET is digital closet web service
          <br />
          using artificial intelligence
        </p>
      </div>
    </StyledContainerDiv>
  );
};

const ContentComponent = ({
  title,
  content,
  column,
  textRow,
  imgRow,
  imgsrc,
  textResponsiveRow,
  imageResponsiveRow,
}) => {
  return (
    <>
      <ContentTextContainer
        column={column}
        row={textRow}
        responsiveRow={textResponsiveRow}
      >
        <ContentTitle>{title}</ContentTitle>
        {content}
      </ContentTextContainer>
      <ContentImageContainer
        column={column}
        row={imgRow}
        responsiveRow={imageResponsiveRow}
      >
        <img
          src={imgsrc}
          alt={title}
          style={{ width: "100%", height: "100%" }}
        />
      </ContentImageContainer>
    </>
  );
};

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [ootdImages, setOotdImages] = useState([]);
  const [marketViewImages, setMarketViewImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    await fetch(`${port.url}/api/market/list?page=0&perPage=10`, {})
      .then((response) => response.json())
      .then((marketList) => {
        setMarketViewImages([...marketList.posts, ...marketList.posts]);
      })
      .catch((err) => {
        console.log(err);
      });

    await fetch(`${port.url}/api/posts/list?page=0&perPage=10`, {})
      .then((response) => response.json())
      .then((ootdList) => {
        setOotdImages([...ootdList.posts, ...ootdList.posts]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <HomeImgContainer />
      <GirdContainer>
        <DescribeTitle>
          Our Service <br />
          For you
          <br />
          By AI CLOSET!
        </DescribeTitle>
        <ContentComponent
          title={"CLOSET"}
          content={"AI will classify your clothes!"}
          column={"2/3"}
          textRow={"1/2"}
          imgRow={"2/5"}
          imgsrc={
            "https://cdn.pixabay.com/photo/2015/08/29/01/18/closet-912694_960_720.jpg"
          }
          textResponsiveRow={"3/4"}
          imageResponsiveRow={"4/7"}
        />
        <ContentComponent
          title={"OOTD"}
          content={"Upload Your Today's Fashion!"}
          column={"1/2"}
          textRow={"4/5"}
          imgRow={"5/8"}
          imgsrc={
            "https://cdn.pixabay.com/photo/2014/08/03/22/01/friends-409403_960_720.jpg"
          }
          textResponsiveRow={"8/9"}
          imageResponsiveRow={"9/12"}
        />
        <ContentComponent
          title={"MARKET"}
          content={"Upload Your Cloth to Sell!"}
          column={"2/3"}
          textRow={"7/8"}
          imgRow={"8/11"}
          imgsrc={
            "https://cdn.pixabay.com/photo/2016/11/19/15/40/clothes-1839935_960_720.jpg"
          }
          textResponsiveRow={"14/15"}
          imageResponsiveRow={"15/18"}
        />
      </GirdContainer>

      <div
        style={{
          width: 100 + "%",
          padding: "0 17vw 0 17vw",
          marginTop: "-1.5vw",
        }}
      >
        <hr></hr>
      </div>
      <PreviewTitle>OOTD & MARKET Preview</PreviewTitle>
      <PreviewDiv>
        <RotateImageContainer>
          {ootdImages.map((it, index) => {
            const srcUrl = port.url + "/" + it.img.url.split("/")[1];
            return (
              <ImageContainer key={index}>
                <ImageDiv>
                  <img
                    src={srcUrl}
                    alt="market"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 12 + "%",
                    }}
                    onClick={() => {
                      if (cookies.userData) {
                        navigate(`/board/${it.shortId}`);
                        window.location.reload();
                      } else {
                        alert("로그인 후 게시판 이용이 가능합니다.");
                        navigate(`/login`);
                        window.location.reload();
                      }
                    }}
                  ></img>
                </ImageDiv>
              </ImageContainer>
            );
          })}
        </RotateImageContainer>
        <ReverseRotateImageContainer>
          {marketViewImages.map((it, index) => {
            const srcUrl = port.url + "/" + it.img.url.split("/")[1];
            return (
              <ImageContainer key={index}>
                <ImageDiv>
                  <img
                    src={srcUrl}
                    alt="market"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 12 + "%",
                    }}
                    onClick={() => {
                      if (cookies.userData) {
                        navigate(`/market/${it.shortId}`);
                        window.location.reload();
                      } else {
                        alert("로그인 후 게시판 이용이 가능합니다.");
                        navigate(`/login`);
                        window.location.reload();
                      }
                    }}
                  ></img>
                </ImageDiv>
              </ImageContainer>
            );
          })}
        </ReverseRotateImageContainer>
      </PreviewDiv>
      <div style={{ textAlign: "center" }}></div>
    </div>
  );
};

export default Home;
