import React, { useState, useEffect } from 'react';
import UploadImage from './closetUtils/UploadImage.js';


const Closet = ({ loginState, setLoginState }) => {
    return (
        <div>
            Closet
            <UploadImage />
        </div>
    )
}

export default Closet;