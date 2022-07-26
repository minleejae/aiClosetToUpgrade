import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadImage = () => {
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

    const fileUploadHandler = () => {
        const fd = new FormData();
        console.log(selectedFile);
        fd.append('image', selectedFile, selectedFile.name);
        axios.post('http://localhost:8000/upload', fd)
            .then(res => {
                console.log(res);
            });
    }


    return (
        <div>
            <img id="previewImage" src={imgSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiRwytg01sZzsoE9fMP1sOyMfr089hOplyPX5NCt66-w&s"} alt="preview"></img>
            <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => fileSelectedHandler(e)} />
            <button onClick={(e) => fileUploadHandler(e)}>Upload</button>
        </div>
    )
}
export default UploadImage;