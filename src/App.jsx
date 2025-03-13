
import './App.css'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/blog/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import AddBlog from './pages/blog/AddBlog'
import EditBlog from './pages/blog/EditBlog'
import SingleBlog from './pages/blog/SingleBlog'
import {Provider} from 'react-redux'
import store from '../store/store'
import Protected from './Protected'

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog/add" element={<Protected><AddBlog /></Protected>} />
      <Route path="/blog/edit/:id" element={<Protected><EditBlog /></Protected>} />
      <Route path="/blog/:id" element={<SingleBlog />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
