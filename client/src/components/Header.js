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
  };

  //width 관리
  useEffect(() => {
    updateWidth(document.documentElement.clientWidth);
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
      className={scrollPosition < 33 ? "navbar" : "navbar-scrolled"}
      style={{
        position: "fixed",
        width: 100 + "%",
        zIndex: 1000,
      }}
    >
      <div className="navbar__logo">
        <i className="fa-solid fa-shirt"></i>
        <a href="/">AI-CLOSET</a>
      </div>
      <ul className="navbar__menu">
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <a href="/closet">CLOSET</a>
        </li>
        <li>
          <a href="/board">OOTD</a>
        </li>
        <li>
          <a href="/market">MARKET</a>
        </li>
      </ul>
      <ul className="navbar__log">
        {cookies.userData !== undefined ? (
          <>
            <li>
              <a href="/mypage">My Page</a>
            </li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                removeCookie("userData");
                navigate("/");
              }}
            >
              <a href="/">Log Out</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </>
        )}
      </ul>
      <a
        href=""
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
