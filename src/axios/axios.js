import axios from "axios";

let axiosConn = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://backend-admin-jn39ihzl0-carolinamv1234s-projects.vercel.app",
});

export default axiosConn;


