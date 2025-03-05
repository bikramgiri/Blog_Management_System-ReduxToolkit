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

  useEffect(()=>{
    // check the status value
  // status--> Success --> navigate to login page esle
  if(status === STATUSES.SUCCESS){
    navigate('/')
    dispatch(setStatus(null))
  }else{
    navigate('/login')
  }
  },[status])

  return (
	<Form type="Login" user={user} onSubmit={handleLogin} />
  )
}

export default Login