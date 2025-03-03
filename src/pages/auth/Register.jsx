// import React from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../../store/authSlice'
import Form from './components/Form/Form'

const Register = () => {
  const dispatch = useDispatch()
  const handleRegister = (data) => {
	dispatch(register(data))
  }
  return (
	<Form type="Register" onSubmit={handleRegister}/>
  )
}

export default Register