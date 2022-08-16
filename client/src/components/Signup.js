import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { useRef } from "react";
import port from "./../data/port.json";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // 회원가입 입력받을 데이터를 props로 넘겨줌
  const [signUpData, setSignUpdata] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
  });

  const onChangeSignUpdata = (e) => {
    setSignUpdata({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const emailRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validEmailCheck = (obj) => {
    var pattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return obj.match(pattern) != null;
  };

  const validPasswordCheck = () => {
    const pw = $("#password").val();
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/gi);

    if (pw.length < 8 || pw.length > 20) {
      alert("비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.");
      return false;
    } else if (pw.search(/\s/) !== -1) {
      alert("비밀번호는 공백 없이 입력해주세요.");
      return false;
    } else if (num < 0 || eng < 0) {
      alert("비밀번호를 영문,숫자 혼합하여 입력해주세요.");
      return false;
    } else {
      return true;
    }
  };

  const onClickSignUpButton = () => {
    if (
      signUpData.email === "" ||
      validEmailCheck(signUpData.email) === false
    ) {
      alert("올바른 이메일 주소를 입력해주세요.");
      emailRef.current.focus();
      return;
    }

    if (signUpData.password === "") {
      alert("비밀번호를 입력해주세요.");
      $("#password").focus();
      return;
    }

    if (!validPasswordCheck()) {
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
      });

      $("#password").focus();
    }

    sendSignUpdata()
      .then((res) => {
        alert(res.data.result);
        navigate("/login");
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error);
      });
  };

  const sendSignUpdata = async () => {
    return await axios.post(port.url + "/api/users/signup", signUpData);
  };

  return (
    <div>
      <div></div>
      <div
        className="album"
        style={{
          paddingTop: 100 + "px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>
          <p style={{ fontSize: 22 + "px", marginBottom: "70px" }}>
            Hello,
            <br />
            Sign up and use AI CLOSET!
          </p>
        </div>
        <div
          className="container"
          style={{ width: 30 + "%", minWidth: 300 + "px" }}
        >
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
                placeholder="abc@example.com"
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
              <div style={{ color: "salmon" }}>
                비밀번호는 영어 숫자 혼합 8자리이상이어야 합니다.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="rePassword" className="form-label">
                Re Password
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
                Your name
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
    </div>
  );
};

export default Signup;
