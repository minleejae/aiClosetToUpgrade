import homeImage from "./../images/home.jpeg";
import styled from "styled-components";

const StyledContainerDiv = styled.div`
  position: relative;
`;

const DescribeDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
  display: flex;
  padding: 10% 5%;
`;

const ColumnDiv = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const DescribeBox = styled.div`
  width: 100%;
  aspect-ratio: 16 / 12;
  background-color: yellow;
  min-height: 150px;
  min-width: 200px;
`;

const DescribeText = styled.div`
  width: 100%;
  border: 1px solid gray;
  height: 25%;
  bakcground-color: gray;
`;

const DescribeImage = styled.div`
  width: 100%;
  border: 1px solid gray;
  height: 75%;
  bakcground-color: gray;
`;

const PreviewDiv = styled.div`
  width: 100%;
  height: 65vw;
  display: flex;
  flex-direction: column;
  background-color: orange;
  justify-content: space-evenly;
`;

const RotateImageContainer = styled.div`
  width: 100%;
  height: 20vw;
  background-color: salmon;
  border: 1px solid gray;
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
            <p style={{ fontSize: "min(8vh, 4vw)", marginLeft: -40 + "%" }}>
              Our Service <br />
              For you
              <br />
              By AI ClOSET
              <i className="bi bi-emoji-smile"></i>
            </p>
          </div>
          <div style={{ height: "min(22vh, 8vw)" }}></div>
          <DescribeBox>
            <DescribeText>sadda</DescribeText>
            <DescribeImage></DescribeImage>
          </DescribeBox>
          <hr></hr>
        </ColumnDiv>
        <ColumnDiv>
          <DescribeBox>
            <DescribeText>sadda</DescribeText>
            <DescribeImage></DescribeImage>
          </DescribeBox>
          <hr></hr>

          <div style={{ height: "min(33vh, 18vw)" }}></div>
          <hr></hr>
          <DescribeBox>
            <DescribeText>sadda</DescribeText>
            <DescribeImage></DescribeImage>
          </DescribeBox>
        </ColumnDiv>
      </DescribeDiv>
      <PreviewDiv>
        <RotateImageContainer>
          <h1>OOTD</h1>
        </RotateImageContainer>
        <RotateImageContainer>
          <h1>MARKET</h1>
        </RotateImageContainer>
      </PreviewDiv>
    </div>
  );
};

export default Home;
