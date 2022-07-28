import React, { useState, useEffect } from 'react';

//signUpData, onChangeSignUpdata 만들어야함
const Signup = ({ signUpData, onChangeSignUpdata }) => {
    return (
        <div>
            <div className="album">
                <div className="container">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" value={signUpData.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChangeSignUpdata} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" value={signUpData.password} className="form-control" id="password" name="password" onChange={onChangeSignUpdata} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rePassword" className="form-label">Repassword</label>
                            <input type="password" value={signUpData.rePassword} className="form-control" id="rePassword" name="rePassword" onChange={onChangeSignUpdata} />
                        </div >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">name</label>
                            <input type="text" value={signUpData.name} className="form-control" id="name" name="name" onChange={onChangeSignUpdata} />
                        </div >
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form >
                </div >
            </div >
        </div>
    )
}

export default Signup;