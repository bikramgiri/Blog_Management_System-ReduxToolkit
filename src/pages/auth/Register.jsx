// import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { register } from '../../../store/authSlice'
import Form from './components/Form/Form'
import STATUSES from '../../globals/status/statuses'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const {status} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleRegister = (data) => {
	dispatch(register(data))
  // check the status value
  // status--> Success --> navigate to login page esle
  if(status === STATUSES.SUCCESS){
    return navigate('/login')
  }else{
    return navigate('/register')
  }
  }
  return (
	<Form type="Register" onSubmit={handleRegister}/>
  )
}

export default Register