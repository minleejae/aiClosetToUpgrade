import React, { useState, useEffect } from 'react';
import DressClassifier from './DressClassifier';

import axios from 'axios';

const UploadImage = ({ uploadActive, setUploadActive }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
    }, [selectedFile]);

    const fileSelectedHandler = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = (e) => {
            setImgSrc(reader.result);
            setSelectedFile(file)
        }
    }

    const fileUploadHandler = async () => {
        if (selectedFile == null) {
            alert("이미지를 선택해주세요!");
            return;
        }
        const fd = new FormData();
        console.log("selectedFile:", selectedFile);
        fd.append('image', selectedFile, selectedFile.name);

        //이미지 분류 ex: {dressType: 'TOP', styleType: 'CASUAL'}
        const type = await DressClassifier(document.getElementById('previewImage'));
        console.log(type);
        //파일 서버로 post
        // axios.post('http://localhost:8000/upload', fd)
        //     .then(res => {
        //         console.log(res);
        //     });

        setUploadActive(false);
    }


    return (
        <div id="uploadBox">
            업로드화면
            <img id="previewImage" src={imgSrc || require('./top1.jpg')} alt="preview"></img>
            <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => fileSelectedHandler(e)} />
            <button onClick={(e) => fileUploadHandler(e)}>Upload</button>
        </div>
    )
}


export default UploadImage;