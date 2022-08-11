import homeImage from "./../images/home.jpeg";
import styled from "styled-components";

const StyledContainerDiv = styled.div`
  position: relative;
`;

const Home = () => {
  return (
    <div>
      <h1>Description about webpage</h1>
      <StyledContainerDiv>
        <img
          src={homeImage}
          alt="home-main"
          style={{
            width: 100 + "%",
            marginTop: -300 + "px",
            minHeight: 600 + "px",
          }}
        />
        <div style={{ position: "absolute", top: 30 + "%", left: 5 + "%" }}>
          <h1 style={{ fontSize: 400 + "%", color: "white" }}>
            What is AI CLOSET?
          </h1>
        </div>
      </StyledContainerDiv>
      <div style={{ display: "flex", backgroundColor: "gray" }}>
        <div style={{ height: 100 + "vw", backgroundColor: "yellow" }}>ads</div>
      </div>
    </div>
  );
};

export default Home;
