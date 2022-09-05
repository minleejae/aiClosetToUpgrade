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
import Chat from "./components/chat/Chat";
import POST_TYPE from "./constants/postType";

function App() {
  //login 여부에 따라 Main 렌더링
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="closet">
          <Route path="" element={<Closet />} />
          <Route
            path="upload"
            element={<WritingForm postType={POST_TYPE.CLOTH} />}
          />
        </Route>
        <Route path="board">
          <Route path="" element={<Community />} />
          <Route
            path="write"
            element={<WritingForm postType={POST_TYPE.OOTD} />}
          />
          <Route path=":id">
            <Route
              path=""
              element={<OotdViewForm postType={POST_TYPE.OOTD} />}
            />
            <Route
              path="update"
              element={<OotdUpdateForm postType={POST_TYPE.OOTD} />}
            />
          </Route>
        </Route>
        <Route path="market">
          <Route path="" element={<Market />} />
          <Route
            path="write"
            element={<WritingForm postType={POST_TYPE.MARKET} />}
          />
          <Route path=":id">
            <Route
              path=""
              element={<MarketViewForm postType={POST_TYPE.MARKET} />}
            />
            <Route
              path="update"
              element={<MarketUpdateForm postType={POST_TYPE.MARKET} />}
            />
          </Route>
        </Route>
        <Route path="mypage" element={<MyPage />}></Route>
        <Route path="chat" element={<Chat />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
