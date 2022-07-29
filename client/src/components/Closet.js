import React, { useState, useEffect } from 'react';
import UploadImage from './closetUtils/UploadImage.js';
import loadClothes from './closetUtils/loadClothes.js';
import ClothesRow from './closetUtils/ClothesRow.js';

const Closet = ({ loginState, setLoginState }) => {
    //upload창 관리하기 위한 state
    const [uploadActive, setUploadActive] = useState(false);
    const [downloadImg, setDownloadImg] = useState(null);

    useEffect(() => {
        loadClothes().then((res) => setDownloadImg(res.data));
    }, [uploadActive]);

    console.log("downloadImg", downloadImg);
    return (
        <div>
            Closet

            <ClothesRow />
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