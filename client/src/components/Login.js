import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import port from "./../data/port.json";

//signInData, onChangeSignInData 만들어야함
const Login = ({ signInData, onChangeSignInData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onClickLoginButton = () => {
    if (signInData.email === "") {
      alert("이메일을 입력해주세요.");
      $("#email").focus();
      return;
    }

    if (signInData.password === "") {
      alert("비밀번호를 입력해주세요.");
      $("#password").focus();
      return;
    }

    sendSignInData()
      .then((res) => {
        setCookie("userData", res.data, { path: "/" });
        alert("로그인이 완료되었습니다.");
        navigate("/");
      })
      .catch((e) => {
        setErrorMessage(e.response.data.fail);
      });
  };

  const sendSignInData = async () => {
    return await axios.post(port.url + "/users/login", signInData);
  };

  return (
    <div>
      <div className="album">
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={signInData.email}
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                onChange={onChangeSignInData}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={signInData.password}
                className="form-control"
                id="password"
                name="password"
                onChange={onChangeSignInData}
              />
            </div>
            <button
              type="button"
              onClick={onClickLoginButton}
              className="btn btn-primary"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
