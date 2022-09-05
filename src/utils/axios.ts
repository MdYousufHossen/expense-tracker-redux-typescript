import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lws-mock-data.herokuapp.com/",
});

export default axiosInstance;
