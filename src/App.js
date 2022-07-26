import React, { useState, useEffect } from 'react'
import './App.css';
import Login from './components/Login.js';
import Main from './components/Main.js';



function App() {
  const [loginState, setLoginState] = useState(false);
  useEffect(() => {
  }, [loginState]);



  //login 여부에 따라 Main 렌더링
  return (
    <div className="App">
      {loginState ?
        (<Main></Main>) :
        <Login
          loginState={loginState}
          setLoginState={setLoginState}
        />}
    </div>
  );
}

export default App;
