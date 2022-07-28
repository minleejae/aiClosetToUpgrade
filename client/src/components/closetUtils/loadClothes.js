import axios from 'axios';


//유저가 처음 closet 페이지에 입장했을 때 유저가 지닌 옷 정보 로딩
const loadClothes = async () => {
    const formData = new FormData();
    formData.append('user', "mmj9808");

    //파일 data 서버로 post
    return await axios.post('http://localhost:8080/clothes', formData)
}

export default loadClothes