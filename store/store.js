// import {configureStore} from '@reduxjs/toolkit'
// import authSlice from './authSlice'

// const store = configureStore({
//       reducer : {
//             auth : authSlice
//       }
// })

// export default store


import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./blogSlice" 
import authReducer from "./authSlice"


const store = configureStore({
  reducer: {
    blog: blogReducer, 
    auth: authReducer,
  }
})

export default store