import React, { useState, useEffect } from 'react';

const Header = ({ mainComponents, setMainComponents, setLoginState }) => {
    return (
        <div id="headerBox">
            Header
            <button onClick={() => { setLoginState(false) }}>LogOut</button>
            <ul>
                <li onClick={() => { setMainComponents("Closet") }}>Closet</li>
                <li onClick={() => { setMainComponents("Community") }}>Community</li>
                <li onClick={() => { setMainComponents("Sales") }}>Sales</li>
                <li onClick={() => { setMainComponents("MyPage") }}>MyPage</li>
            </ul>
        </div>
    )
}

export default Header;