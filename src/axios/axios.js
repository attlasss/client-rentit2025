import axios from "axios";

let axiosConn = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://backend-theta-cyan.vercel.app",
  // baseURL: "https://backend-admin-jn39ihzl0-carolinamv1234s-projects.vercel.app",
});

axiosConn.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosConn;




