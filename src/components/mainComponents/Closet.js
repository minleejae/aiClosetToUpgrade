import React, { useState, useEffect } from 'react';
import UploadImage from './closetUtils/UploadImage.js';


const Closet = ({ loginState, setLoginState }) => {
    //upload창 관리하기 위한 state
    const [uploadActive, setUploadActive] = useState(false);

    useEffect(() => {
    }, [uploadActive]);


    return (
        <div>
            Closet
            <button onClick={() => { setUploadActive(true) }}>upload</button>
            {uploadActive &&
                <UploadImage
                    uploadActive={uploadActive}
                    setUploadActive={setUploadActive}
                />}
        </div>
    )
}

export default Closet;