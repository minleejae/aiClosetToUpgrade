import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { useRef } from "react";
import port from "./../data/port.json";

//signUpData, onChangeSignUpdata 만 들어야함
const Signup = ({ signUpData, setSignUpdata, onChangeSignUpdata }) => {
  const emailRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const onClickSignUpButton = () => {
    if (signUpData.email === "") {
      alert("이메일 입력해주세요.");
      emailRef.current.focus();
      return;
    }

    if (signUpData.password === "") {
      alert("비밀번호를 입력해주세요.");
      $("#password").focus();
      return;
    }

    if (signUpData.rePassword === "") {
      alert("재비밀번호를 입력해주세요.");
      $("#rePassword").focus();
      return;
    }

    if (signUpData.name === "") {
      alert("이름 입력해주세요.");
      $("#name").focus();
      return;
    }

    if (signUpData.password !== signUpData.rePassword) {
      alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
      setSignUpdata({
        ...signUpData,
        password: "",
        rePassword: "",
      });

      $("#password").focus();
    }

    sendSignUpdata()
      .then((res) => {
        alert(res.data.result);
        window.location.reload();
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error);
      });
  };

  const sendSignUpdata = async () => {
    return await axios.post(port.url + "/api/users/signup", signUpData);
  };

  return (
    <div className="album">
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              ref={emailRef}
              value={signUpData.email}
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onChangeSignUpdata}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={signUpData.password}
              className="form-control"
              id="password"
              name="password"
              onChange={onChangeSignUpdata}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rePassword" className="form-label">
              rePassword
            </label>
            <input
              type="password"
              value={signUpData.rePassword}
              className="form-control"
              id="rePassword"
              name="rePassword"
              onChange={onChangeSignUpdata}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              value={signUpData.name}
              className="form-control"
              id="name"
              name="name"
              onChange={onChangeSignUpdata}
            />
          </div>
          <div className="mb-3">
            <p className="text-danger">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onClickSignUpButton();
            }}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
