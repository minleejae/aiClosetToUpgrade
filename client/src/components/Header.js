import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "./componentsCss/Header.css";
import { connect } from "react-redux";
import { updateWidth } from "../redux";

const Header = ({ width, columns, updateWidth }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();

  //나중에 스크롤 이벤트 무한스크롤링과 함께 리팩토링 예정
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    // console.log("scroll");
  };

  //width 관리
  useEffect(() => {
    updateWidth(document.documentElement.clientWidth - 20);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollPosition]);

  const handleResize = () => {
    updateWidth(document.documentElement.clientWidth);
  };

  //작은화면일 때 햄버거버튼 토글에 따라 메뉴창 보이게 하기
  const handleClickToggleBtn = (e) => {
    e.preventDefault();
    $(".navbar__menu").toggleClass("active");
    $(".navbar__log").toggleClass("active");
  };

  return (
    <nav
      id="nav-container"
      className={scrollPosition < 33 ? "navbar" : "navbar navbar-scrolled"}
      style={{
        position: "fixed",
        width: 100 + "%",
        zIndex: 1000,
      }}
    >
      <div className="navbar__logo">
        <li
          onClick={() => {
            navigate("/");
          }}
        >
          <i className="fa-solid fa-shirt"></i>
          AI CLOSET
        </li>
      </div>
      <ul className="navbar__menu" style={{ marginRight: "-4vw" }}>
        <div
          className="single-nav"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          <li
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            HOME
          </li>
        </div>
        <div
          className="single-nav"
          onClick={() => {
            if (cookies.userData === undefined) {
              alert("로그인 후 옷장을 이용하실 수 있습니다.");
              navigate("/login");
            } else {
              navigate("/closet");
              window.location.reload();
            }
          }}
        >
          <li>CLOSET</li>
        </div>
        <div
          className="single-nav"
          onClick={() => {
            if (cookies.userData === undefined) {
              alert("로그인 후 게시판을 이용하실 수 있습니다.");
              navigate("/login");
            } else {
              navigate("/board");
              window.location.reload();
            }
          }}
        >
          <li>OOTD</li>
        </div>
        <div
          className="single-nav"
          onClick={() => {
            if (cookies.userData === undefined) {
              alert("로그인 후 게시판을 이용하실 수 있습니다.");
              navigate("/login");
            } else {
              navigate("/market");
              window.location.reload();
            }
          }}
        >
          <li>MARKET</li>
        </div>
      </ul>
      <ul className="navbar__log">
        {cookies.userData !== undefined ? (
          <>
            <li
              onClick={() => {
                navigate("/chat");
                window.location.reload();
              }}
            >
              Chat
            </li>
            <li
              onClick={() => {
                navigate("/mypage");
                window.location.reload();
              }}
            >
              My Page
            </li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                removeCookie("userData");
                alert("로그아웃 되었습니다.");
                navigate("/");
                window.location.reload();
              }}
            >
              Log Out
            </li>
          </>
        ) : (
          <>
            <li
              onClick={(e) => {
                navigate("/login");
              }}
            >
              Login
            </li>
            <li
              onClick={(e) => {
                navigate("/signup");
                window.location.reload();
              }}
            >
              Sign Up
            </li>
          </>
        )}
      </ul>
      <a
        href="#none"
        className="navbar__toggleBtn"
        onClick={(e) => {
          handleClickToggleBtn(e);
        }}
      >
        <i className="fa-solid fa-bars"></i>
      </a>
    </nav>
  );
};

const mapStateToProps = ({ width }) => {
  return { width: width.width, columns: width.columns };
};

const mapDispatchToProps = {
  updateWidth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
