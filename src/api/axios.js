import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "46fd1ed18ff9f50afaea5ce2c1da227d",
    language: "ko-KR"
  }
})

export default instance;