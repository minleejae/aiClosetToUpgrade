import React, { useState, useEffect } from 'react';

const Login = ({ loginState, setLoginState }) => {
    return (
        <div>
            login
            <button onClick={() => { setLoginState(true) }}>login</button>
        </div>
    )
}

export default Login;