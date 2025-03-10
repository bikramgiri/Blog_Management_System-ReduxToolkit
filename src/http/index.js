// import axios from "axios"

// const API = axios.create({
//       baseURL : 'https://react30.onrender.com/api/user/',
//       headers : {
//             "Content-Type": 'application/json',
//             "Authorization": localStorage.getItem("jwt")
//       }
// }) 

// export default API




import axios from "axios";
const API = axios.create({
  baseURL: "https://react30.onrender.com/api/user/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: localStorage.getItem("jwt"),
  },
});
export default API

// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://react30.onrender.com/api/user/",
//   headers: {
//     "Content-Type": "application/json",
//   }
// })

// // Automatically set the Authorization header before every request
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("jwt") // Get latest token
//   if (token) {
//     config.headers["Authorization"] = token
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default API

