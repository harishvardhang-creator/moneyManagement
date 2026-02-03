import axios from 'axios';

const API = axios.create({
  baseURL: "https://money-management-app-ybk0.onrender.com/api"
});

export default API;
