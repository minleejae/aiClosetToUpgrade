import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.js";
import Header from "./components/Header.js";
import Closet from "./components/Closet.js";
import Community from "./components/Community.js";
import MyPage from "./components/MyPage.js";
import Footer from "./components/Footer.js";
import Home from "./components/Home";
import Signup from "./components/Signup";
import WritingForm from "./components/community/WritingForm";
import Market from "./components/Market";
import OotdViewForm from "./components/community/OotdViewForm";
import MarketViewForm from "./components/community/MarketViewForm";
import MarketUpdateForm from "./components/community/MarketUpdateForm";
import OotdUpdateForm from "./components/community/OotdUpdateForm";

function App() {
  // 로그인 입력받을 데이터를 props로 넘겨줌
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  // 회원가입 입력받을 데이터를 props로 넘겨줌
  const [signUpData, setSignUpdata] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
  });

  useEffect(() => {});

  //로그인 입력시 STATE 변화시키는 함수
  const onChangeSignInData = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSignUpdata = (e) => {
    setSignUpdata({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  //login 여부에 따라 Main 렌더링
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={
            <Login
              signInData={signInData}
              onChangeSignInData={onChangeSignInData}
            />
          }
        />
        <Route
          path="signup"
          element={
            <Signup
              signUpData={signUpData}
              setSignUpdata={setSignUpdata}
              onChangeSignUpdata={onChangeSignUpdata}
            />
          }
        />
        <Route path="closet">
          <Route path="" element={<Closet />} />
          <Route path="upload" element={<WritingForm postType={1} />} />
        </Route>
        <Route path="board">
          <Route path="" element={<Community />} />
          <Route path="write" element={<WritingForm postType={2} />} />
          <Route path=":id">
            <Route path="" element={<OotdViewForm postType={3} />} />
            <Route path="update" element={<OotdUpdateForm postType={3} />} />
          </Route>
        </Route>
        <Route path="market">
          <Route path="" element={<Market />} />
          <Route path="write" element={<WritingForm postType={3} />} />
          <Route path=":id">
            <Route path="" element={<MarketViewForm postType={3} />} />
            <Route path="update" element={<MarketUpdateForm postType={3} />} />
          </Route>
        </Route>
        <Route path="mypage" element={<MyPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
