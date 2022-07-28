import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const Header = ({ }) => {
    //작은화면일 때 햄버거버튼 토글에 따라 메뉴창 보이게 하기
    const handleClickToggleBtn = (e) => {
        e.preventDefault();
        $(".navbar__menu").toggleClass("active");
        $(".navbar__log").toggleClass("active");
    }

    return (
        <nav class="navbar">
            <div class="navbar__logo">
                <i class="fa-solid fa-shirt"></i>
                <a href="/">O-Closet</a>
            </div>
            <ul class="navbar__menu">
                <li><a href="/">Home</a></li>
                <li><a href="/closet">Closet</a></li>
                <li><a href="/board">Community</a></li>
                <li><a href="/market">Sales</a></li>
                <li><a href="/mypage">MyPage</a></li>
            </ul>
            <div class="navbar__log">
                <div>
                    <a href="/">Logout</a>
                </div>
            </div>
            <a href="" class="navbar__toggleBtn" onClick={(e) => handleClickToggleBtn(e)}>
                <i class="fa-solid fa-bars"></i>
            </a>
        </nav>
    )
}

export default Header;