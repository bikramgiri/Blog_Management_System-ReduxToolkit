
import './App.css'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/blog/Home'
// import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import AddBlog from './pages/blog/AddBlog'
import EditBlog from './pages/blog/EditBlog'
// import SingleBlog from './pages/blog/SingleBlog'
import {Provider} from 'react-redux'
import store from '../store/store'
import Protected from './Protected'
import { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { ErrorBoundary } from 'react-error-boundary'
import Parent from './pages/useCallback/Parent'

const SingleBlog = lazy(()=>import('./pages/blog/SingleBlog'))
const Register = lazy(()=>import('./pages/auth/Register'))

function ErrorFallback({error}){
  return(
    <div>
      <p>Something went wrong...</p>
      <p>{error.message}</p>
    </div>
  )
}

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<h1>Loading...</h1>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog/add" element={<Protected><AddBlog /></Protected>} />
      <Route path="/blog/edit/:id" element={<Protected><EditBlog /></Protected>} />
      <Route path="/blog/:id" element={<SingleBlog />} />
      <Route path="/usecallback" element={<Parent/>} />
    </Routes>
    </Suspense>
    </ErrorBoundary>
    </BrowserRouter>
    </Provider>
  )
}

// Add PropTypes validation for the `children` prop
ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired, // Ensures error is required and can be any object
}

export default App
