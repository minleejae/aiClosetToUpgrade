import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const Header = ({ loginState }) => {
    //작은화면일 때 햄버거버튼 토글에 따라 메뉴창 보이게 하기
    const handleClickToggleBtn = (e) => {
        e.preventDefault();
        $(".navbar__menu").toggleClass("active");
        $(".navbar__log").toggleClass("active");
    }

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <i className="fa-solid fa-shirt"></i>
                <a href="/">O-CLOSET</a>
            </div>
            <ul className="navbar__menu">
                <li><a href="/">HOME</a></li>
                <li><a href="/closet">CLOSET</a></li>
                <li><a href="/board">OOTD</a></li>
                <li><a href="/market">MARKET</a></li>

            </ul>
            <ul className="navbar__log">
                {
                    loginState ? (
                        <>
                            <li><a href="/mypage">My Page</a></li>
                            <li><a href="/">Log Out</a></li>
                        </>) : (
                        <>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/signup">Sign Up</a></li>
                        </>)
                }

            </ul>
            <a href="" className="navbar__toggleBtn" onClick={(e) => handleClickToggleBtn(e)}>
                <i className="fa-solid fa-bars"></i>
            </a>
        </nav>
    )
}

export default Header;