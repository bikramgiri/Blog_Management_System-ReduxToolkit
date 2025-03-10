// import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from './components/Form/Form'
import { login, setStatus} from '../../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import STATUSES from '../../globals/status/statuses'
import { useEffect } from 'react'

const Login = () => {
 const {user,status} = useSelector(state => state.auth)
 const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = (data) => {
	dispatch(login(data))
  }

  // useEffect(()=>{
  //   // check the status value
  // // status--> Success --> navigate to login page esle
  // if(status === STATUSES.SUCCESS){
  //   navigate('/')
  //   dispatch(setStatus(null))
  // }else{
  //   navigate('/login')
  // }
  // },[status, navigate, dispatch])
  

  useEffect(() => {
    // Check if the user is already logged in (token exists)
    const token = localStorage.getItem("jwt");
    if (token) {
      navigate("/"); // If the token is present, redirect to the home page
      return;
    }

    // After login success, redirect to home page
    if (status === STATUSES.SUCCESS) {
      navigate("/");
      dispatch(setStatus(null)); // Clear status after navigation
    }
  }, [status, navigate, dispatch]);

  
  return (
	<Form type="Login" user={user} onSubmit={handleLogin} />
  )
}

export default Login