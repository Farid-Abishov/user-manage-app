import axios from 'axios';

const api = axios.create({
    baseURL: "https://gorest.co.in/",
    headers: {
        "Content-Type": "application/json",
        "Token": "13d5b65507c9b204f073becf117f131044d0ab96fbd36981876392eb6a72e61c", // Statik token burada təyin olunur
    },
});

 export default api; 
