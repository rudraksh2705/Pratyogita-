import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://127.0.0.1:3000/api",
  withCredentials: true,
});

API.interceptors.request.use((configs) => {
  const token = localStorage.getItem("token");
  if (token) {
    configs.headers.Authorization = `Bearer ${token}`;
  }
  return configs;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
