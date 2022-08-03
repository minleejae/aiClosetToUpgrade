import homeImage from "./../images/home.jpeg";

const Home = () => {
  return (
    <div>
      <h1>Description about webpage</h1>
      <div style={{ position: "relative" }}>
        <img
          src={homeImage}
          alt="home-main"
          style={{ width: 100 + "%", marginTop: -300 + "px" }}
        />
        <div style={{ position: "absolute", top: 30 + "%", left: 5 + "%" }}>
          <h1 style={{ fontSize: 400 + "%", color: "white" }}>
            What is AI CLOSET?
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
