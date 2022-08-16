import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import port from "./../data/port.json";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

//회원 정보 업데이트 하는 페이지
const MyPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validPasswordCheck = () => {
    const pw = $("#password").val();
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/gi);

    if (pw.length < 8 || pw.length > 20 || num < 0 || eng < 0) {
      alert("비밀번호는 8자리 ~ 20자리 이내 영문,숫자 혼합하여 입력해주세요.");
      return false;
    } else if (pw.search(/\s/) !== -1) {
      alert("비밀번호는 공백 없이 입력해주세요.");
      return false;
    } else {
      return true;
    }
  };

  const onClickSignUpButton = () => {
    if ($("#password").val() === "") {
      alert("비밀번호를 입력해주세요.");
      $("#password").focus();
      return;
    }

    if (!validPasswordCheck()) {
      return;
    }

    if ($("#rePassword").val() === "") {
      alert("재비밀번호를 입력해주세요.");
      $("#rePassword").focus();
      return;
    }

    if ($("#password").val() !== $("#rePassword").val()) {
      alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
      $("#rePassword").focus();
      return;
    }

    const userUpdateData = {
      email: cookies.userData.email,
      password: $("#password").val(),
      name: cookies.userData.name,
    };
    console.log(userUpdateData);

    axios
      .put(
        port.url + "/api/users/password/change",
        { password: userUpdateData.password },
        {
          headers: { accessToken: cookies.userData.accessToken },
        }
      )
      .then((res) => {
        alert("비밀번호가 변경되었습니다!");
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <div className="album" style={{ paddingTop: 100 + "px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>MY PAGE</h1>
        <p style={{ fontSize: 22 + "px" }}>Update Your profile</p>
      </div>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={cookies.userData.email}
              disabled
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
            <div style={{ color: "salmon" }}>
              비밀번호는 영어 숫자 혼합 8자리이상이어야 합니다.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="rePassword" className="form-label">
              rePassword
            </label>
            <input
              type="password"
              className="form-control"
              id="rePassword"
              name="rePassword"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              value={cookies.userData.email}
              className="form-control"
              id="name"
              name="name"
            />
          </div>
          <div className="mb-3">
            <p className="text-danger"></p>
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

export default MyPage;
