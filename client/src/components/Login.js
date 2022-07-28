import React, { useState, useEffect } from 'react';


//signInData, onChangeSignInData 만들어야함
const Login = ({ signInData, onChangeSignInData }) => {
    return (
        <div>
            <div className="album">
                <div className="container">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" value={signInData.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChangeSignInData} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" value={signInData.password} className="form-control" id="password" name="password" onChange={onChangeSignInData} />
                        </div>
                        <button type="submit" className="btn btn-primary">로그인</button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Login;