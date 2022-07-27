import React, { useState, useEffect } from 'react'
import './App.css';
import Login from './components/Login.js';
import Main from './components/Main.js';

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
      {loginState ?
        (<Main loginState={loginState}
          setLoginState={setLoginState}>
        </Main>) :
        <Login
          loginState={loginState}
          setLoginState={setLoginState}
          memberInfo={memberInfo}
          setMemberInfo={setMemberInfo}
        />}
    </div>
  );
}

export default App;
