import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login.js';
import Header from './components/Header.js';
import Closet from './components/Closet.js';
import Community from './components/Community.js';
import Sales from './components/Sales.js';
import MyPage from './components/MyPage.js';
import Footer from './components/Footer.js';

function App() {
  //로그인 여부
  const [loginState, setLoginState] = useState(false);
  //로그인한 회원 정보:{회원 이름, 옷 정보, ..}
  const [memberInfo, setMemberInfo] = useState(null);

  useEffect(() => {
  }, [loginState]);

  //login 여부에 따라 Main 렌더링
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login
          loginState={loginState}
          setLoginState={setLoginState}
          memberInfo={memberInfo}
          setMemberInfo={setMemberInfo}
        />} />
        <Route path='closet' element={<Closet />} />
        <Route path='board' element={<Community />} />
        <Route path='market' element={<Sales />} />
        <Route path='mypage' element={<MyPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
