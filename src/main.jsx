// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// import React from "react"
import ReactDOM from "react-dom/client"  //Correct import for React 18
import { Provider } from "react-redux"
import store from "../store/store"
import "./index.css"
import App from "./App.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
