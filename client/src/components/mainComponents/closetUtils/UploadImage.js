import React, { useState, useEffect } from 'react';
import FormData from 'form-data'
import DressClassifier from './DressClassifier';

import axios from 'axios';

const UploadImage = ({ uploadActive, setUploadActive }) => {
    //현재 선택된 이미지 파일 state
    const [selectedFile, setSelectedFile] = useState(null);
    //현재 선택된 이미지의 source state
    const [imgSrc, setImgSrc] = useState(null);
    //upload 버튼 여러번 클릭되는 것을 방지하기 위한 state
    const [uploadButtonClicked, setUploadButtonClicked] = useState(false);

    useEffect(() => {
    }, [selectedFile, uploadButtonClicked]);

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
        //버튼 여러번 클릭하는 것 차단
        setUploadButtonClicked(true);

        //이미지 분류 typeExample: {dressType: 'TOP', styleType: 'CASUAL'}
        const type = await DressClassifier(document.getElementById('previewImage'));


        //axios로 image파일 서버로 전송하기
        const formData = new FormData();
        formData.append('files', selectedFile, selectedFile.name);
        console.log("selectedFile:", selectedFile.name);
        console.log(formData);

        //파일 data 서버로 post
        await axios({
            method: 'post',
            url: 'http://localhost:8080/upload',
            data: { "img": formData, "test": "abcd" },
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        //옷장페이지로 돌아가기
        setUploadActive(false);
    }

    //form tag 추가하기
    return (
        <div id="uploadBox">
            업로드화면
            <img id="previewImage" src={imgSrc || require('./top1.jpg')} alt="preview"></img>
            <form>
                <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => fileSelectedHandler(e)} />
                <button onClick={(e) => { fileUploadHandler(e); }} disabled={uploadButtonClicked}>Upload</button>
            </form>
        </div>
    )
}


export default UploadImage;