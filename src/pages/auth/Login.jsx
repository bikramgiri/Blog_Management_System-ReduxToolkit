// import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from './components/Form/Form'
import { login} from '../../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import STATUSES from '../../globals/status/statuses'

const Login = () => {
 const {user,status} = useSelector(state => state.auth)
 const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = (data) => {
	dispatch(login(data))
  // check the status value
  // status--> Success --> navigate to login page esle
  if(status === STATUSES.SUCCESS){
    return navigate('/')
  }else{
    return navigate('/login')
  }
  }
  return (
	<Form type="Login" user={user} onSubmit={handleLogin} />
  )
}

export default Login