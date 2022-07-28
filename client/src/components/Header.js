import React, { useState, useEffect } from 'react';

const Header = ({ mainComponents, setMainComponents, setLoginState }) => {
    return (
        <div class="container">
            <header class="d-flex justify-content-center py-3">
                <ul class="nav nav-pills">
                    <li class="nav-item"><a href="/" class="nav-link active" aria-current="page">Home</a></li>
                    <li class="nav-item"><a href="/closet" class="nav-link">Closet</a></li>
                    <li class="nav-item"><a href="/board" class="nav-link">Community</a></li>
                    <li class="nav-item"><a href="/market" class="nav-link">Sales</a></li>
                    <li class="nav-item"><a href="/mypage" class="nav-link">MyPage</a></li>
                </ul>
            </header>
        </div>
    )
}

export default Header;