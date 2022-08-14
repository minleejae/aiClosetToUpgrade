import homeImage from "./../images/home.jpeg";
import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { fetchMarketImages } from "../redux";
import { connect } from "react-redux";
import port from "./../data/port.json";
import { useNavigate } from "react-router-dom";

const StyledContainerDiv = styled.div`
  position: relative;
`;

const DescribeDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 8vw 15vw;
`;

const ColumnDiv = styled.div`
  width: 50vw;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 2vw;
`;

const DescribeBox = styled.div`
  width: 100%;
  aspect-ratio: 16 / 12;
  min-height: 100px;
`;

const DescribeText = styled.div`
  width: 100%;
  height: 25%;
  font-size: 2vw;
  bakcground-color: gray;
`;

const DescribeImage = styled.div`
  width: 100%;
  height: 75%;
  bakcground-color: gray;
  border-radius: 8%;
  overflow: hidden;
`;

const PreviewDiv = styled.div`
  width: 100%;
  height: 45vw;
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
  display: flex;
  animation: ${ReverseImageMove} 16s linear infinite;

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
  border-radius: 12%;
  &:hover {
    cursor: pointer;
  }
`;

const Home = ({ fetchMarketImages, images }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    await fetchMarketImages(0, 20, cookies.userData.accessToken, "", "");
  };

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
                fontWeight: "bold",
              }}
            >
              Our Service <br />
              For you
              <br />
              By AI CLOSET!
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
      <div
        style={{
          width: 100 + "%",
          padding: "0 17vw 0 17vw",
          marginTop: "-1.5vw",
        }}
      >
        <hr></hr>
      </div>
      <div
        style={{
          fontSize: "2.8vw",
          marginLeft: "17vw",
          paddingTop: "4vw",
          marginBottom: "-1.5vw",
          fontWeight: "bold",
        }}
      >
        OOTD & MARKET Preview<br></br>
      </div>
      <PreviewDiv>
        {/* <div style={{ textAlign: "center", fontSize: "2vw" }}>OOTD</div> */}
        <RotateImageContainer>
          {images.map((it, index) => {
            const srcUrl = port.url + "/" + it.img.url.split("/")[1];
            return (
              <ImageContainer key={it._id}>
                <ImageDiv>
                  <img
                    src={srcUrl}
                    alt="market"
                    style={{ width: "100%", borderRadius: 12 + "%" }}
                    onClick={() => {
                      navigate(`/market/${it.shortId}`);
                      window.location.reload();
                    }}
                  ></img>
                </ImageDiv>
              </ImageContainer>
            );
          })}
        </RotateImageContainer>
        {/* <div style={{ textAlign: "center", fontSize: "2vw" }}>MARKET</div> */}
        <ReverseRotateImageContainer>
          {images.map((it, index) => {
            const srcUrl = port.url + "/" + it.img.url.split("/")[1];
            return (
              <ImageContainer key={it._id}>
                <ImageDiv>
                  <img
                    src={srcUrl}
                    alt="market"
                    style={{ width: "100%", borderRadius: 12 + "%" }}
                    onClick={() => {
                      navigate(`/market/${it.shortId}`);
                      window.location.reload();
                    }}
                  ></img>
                </ImageDiv>
              </ImageContainer>
            );
          })}
        </ReverseRotateImageContainer>
      </PreviewDiv>
      <div style={{ textAlign: "center", padding: "4vw" }}></div>
    </div>
  );
};
const mapStateToProps = ({ marketImages }) => {
  return {
    images: marketImages.items,
    loading: marketImages.loading,
    hasMore: marketImages.hasMore,
  };
};

const mapDispatchToProps = {
  fetchMarketImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
