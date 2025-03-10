
import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "https://react30.onrender.com/api/user/",
  headers: {
    "Content-Type": "application/json",  
    Accept: "application/json",         
  },
});

// Interceptor to add JWT token to headers dynamically for each request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt") // Get the latest token from localStorage
    if (token) {
      config.headers["Authorization"] = `${token}` // Set the Authorization header with the token
    } else {
      console.log("No token found. Please login.") 
    }

    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API















// import axios from "axios"

// const API = axios.create({
//       baseURL : 'https://react30.onrender.com/api/user/',
//       headers : {
//             "Content-Type": 'application/json',
//             "Authorization": localStorage.getItem("jwt")
//       }
// }) 

// export default API




// import axios from "axios";
// const API = axios.create({
//   baseURL: "https://react30.onrender.com/api/user/",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: localStorage.getItem("jwt"),
//   },
// });
// export default API

