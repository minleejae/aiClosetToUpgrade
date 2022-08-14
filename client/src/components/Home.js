import homeImage from "./../images/home.jpeg";
import styled, { keyframes } from "styled-components";

const StyledContainerDiv = styled.div`
  position: relative;
`;

const DescribeDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
  display: flex;
  padding: 8vw 15vw;
`;

const ColumnDiv = styled.div`
  width: 50vw;
  height: 100%;
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 2vw;
`;

const DescribeBox = styled.div`
  width: 100%;
  aspect-ratio: 16 / 12;
  background-color: yellow;
  border: 1px solid gray;

  min-height: 100px;
`;

const DescribeText = styled.div`
  width: 100%;
  border: 1px solid gray;
  height: 25%;
  font-size: 2vw;
  bakcground-color: gray;
`;

const DescribeImage = styled.div`
  width: 100%;
  border: 1px solid gray;
  height: 75%;
  bakcground-color: gray;
  border-radius: 8%;
  overflow: hidden;
`;

const PreviewDiv = styled.div`
  width: 100%;
  height: 50vw;
  display: flex;
  flex-direction: column;
  background-color: orange;
  justify-content: space-evenly;
  overflow: hidden;
`;

const imageMove = keyframes`{
  0% {
      transform: translate(0, 0);
  }
  100% {
      transform: translate(-100vw, 0);
  }
}`;

const ReverseImageMove = keyframes`{
  0% {
      transform: translate(-50vw, 0);
  }
  100% {
      transform: translate(0, 0);
  }
}`;

const RotateImageContainer = styled.div`
  width: 200vw;
  height: 20vw;
  position: relative;
  background-color: salmon;
  display: flex;
  animation: ${imageMove} 16s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const ReverseRotateImageContainer = styled.div`
  width: 200vw;
  height: 20vw;
  position: relative;
  background-color: salmon;
  display: flex;
  animation: ${ReverseImageMove} 16s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  background-color: green;

  border-radius: 12%;

  padding: 1.125rem;
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 12%;
  &:hover {
    background-color: skyblue;
    color: blue;
    cursor: pointer;
  }
`;

const Home = () => {
  return (
    <div>
      <StyledContainerDiv>
        <img
          src={homeImage}
          alt="home-main"
          style={{
            width: 100 + "%",
            // marginTop: -280 + "px",
            // minHeight: 600 + "px",

            height: 100 + "vh",
            filter: "brightness(30%)",
          }}
        />
        <div style={{ position: "absolute", top: 38 + "%", left: 5 + "%" }}>
          <h1
            style={{
              fontSize: "min(10vh, 6vw)",
              color: "white",
              fontWeight: "bold",
              marginBottom: 1 + "%",
            }}
          >
            Welcome to AI CLOSET!
          </h1>
          <p
            style={{
              paddingLeft: 1 + "%",
              fontSize: "min(6vh, 3vw)",
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
      <DescribeDiv>
        <ColumnDiv>
          <div>
            <p
              style={{
                fontSize: "2.8vw",
                lineHeight: 110 + "%",
                marginBottom: 0,
              }}
            >
              Our Service <br />
              For you
              <br />
              By AI ClOSET!
            </p>
          </div>
          <div style={{ height: "11vw" }}></div>
          <DescribeBox>
            <DescribeText>
              <h1 style={{ fontSize: "1.5vw", color: "gray" }}>OOTD</h1>
              Upload Your Today's Fashion!
            </DescribeText>
            <DescribeImage>
              <img
                src="https://cdn.pixabay.com/photo/2014/08/03/22/01/friends-409403_960_720.jpg"
                alt="ootd"
                style={{ width: "100%" }}
              />
            </DescribeImage>
          </DescribeBox>
        </ColumnDiv>
        <ColumnDiv>
          <DescribeBox>
            <DescribeText>
              <h1 style={{ fontSize: "1.5vw", color: "gray" }}>CLOSET</h1>
              AI will classfy your clothes!
            </DescribeText>
            <DescribeImage>
              <img
                src="https://cdn.pixabay.com/photo/2015/08/29/01/18/closet-912694_960_720.jpg"
                alt="ootd"
                style={{ width: "100%" }}
              />
            </DescribeImage>
          </DescribeBox>

          <div style={{ height: "18vw" }}></div>

          <DescribeBox>
            <DescribeText>
              <h1 style={{ fontSize: "1.5vw", color: "gray" }}>MARKET</h1>Upload
              Your Cloth to Sell!
            </DescribeText>
            <DescribeImage>
              <img
                src="https://cdn.pixabay.com/photo/2016/11/19/15/40/clothes-1839935_960_720.jpg"
                alt="ootd"
                style={{ width: "100%" }}
              />
            </DescribeImage>
          </DescribeBox>
        </ColumnDiv>
      </DescribeDiv>
      <div style={{ textAlign: "center", fontSize: "3vw" }}>
        Community Preview
      </div>
      <PreviewDiv>
        <div style={{ textAlign: "center", fontSize: "2.5vw" }}>OOTD</div>
        <RotateImageContainer>
          <ImageContainer>
            <ImageDiv></ImageDiv>
          </ImageContainer>
          <ImageContainer>
            <ImageDiv></ImageDiv>
          </ImageContainer>
          <ImageContainer>3</ImageContainer>
          <ImageContainer>4</ImageContainer>
          <ImageContainer>5</ImageContainer>
          <ImageContainer>6</ImageContainer>
          <ImageContainer>7</ImageContainer>
          <ImageContainer>8</ImageContainer>
          <ImageContainer>9</ImageContainer>
          <ImageContainer>10</ImageContainer>
          <ImageContainer>11</ImageContainer>
          <ImageContainer>12</ImageContainer>
          <ImageContainer>13</ImageContainer>
          <ImageContainer>14</ImageContainer>
        </RotateImageContainer>
        <div style={{ textAlign: "center", fontSize: "2.5vw" }}>MARKET</div>
        <ReverseRotateImageContainer>
          <ImageContainer>
            <ImageDiv></ImageDiv>
          </ImageContainer>
          <ImageContainer>
            <ImageDiv></ImageDiv>
          </ImageContainer>
          <ImageContainer>3</ImageContainer>
          <ImageContainer>4</ImageContainer>
          <ImageContainer>5</ImageContainer>
          <ImageContainer>6</ImageContainer>
          <ImageContainer>7</ImageContainer>
          <ImageContainer>8</ImageContainer>
          <ImageContainer>9</ImageContainer>
          <ImageContainer>10</ImageContainer>
          <ImageContainer>11</ImageContainer>
          <ImageContainer>12</ImageContainer>
          <ImageContainer>13</ImageContainer>
          <ImageContainer>14</ImageContainer>
        </ReverseRotateImageContainer>
      </PreviewDiv>
      <div style={{ textAlign: "center", padding: "4vw" }}></div>
    </div>
  );
};

export default Home;
