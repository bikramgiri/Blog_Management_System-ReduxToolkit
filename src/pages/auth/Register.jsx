// import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { register,setStatus} from '../../../store/authSlice'
import Form from './components/Form/Form'
import STATUSES from '../../globals/status/statuses'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Register = () => {
  const {status} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleRegister = (data) => {
	dispatch(register(data))
  }

  useEffect(()=>{
    // check the status value
  // status--> Success --> navigate to login page esle register page
  if(status === STATUSES.SUCCESS){
    navigate('/login')
    dispatch(setStatus(null))
  }
  // else{
  //   navigate('/register')
  // }
  },[status])

  return (
	<Form type="Register" onSubmit={handleRegister}/>
  )
}

export default Register