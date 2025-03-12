// import React from 'react'
// import Navbar from '../../components/navbar/Navbar'
import Layout from '../../components/layout/Layout'
import Form from './components/form/Form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog, setStatus } from '../../../store/blogSlice'
import STATUSES from '../../globals/status/statuses'
import { useEffect } from 'react'

const AddBlog = () => {
  const navigate = useNavigate()
  const { status } = useSelector((state) => state.blog)
  const dispatch = useDispatch()
  
  // Reset status when the component mounts
  useEffect(() => {
    dispatch(setStatus({ key: 'add', value: STATUSES.IDLE }));
  }, [dispatch]);

   const handleAddBlog = (data) => {
    dispatch(addBlog(data))
  }

     // Navigate to home page **only after submitting a blog**
     useEffect(()=> {
      if(status.add === STATUSES.SUCCESS){
        console.log("Blog successfully created! Navigating to home.")
        dispatch(setStatus({ key: 'add', value: STATUSES.IDLE }));
        navigate("/")
      }
    },[status.add, dispatch, navigate])

  return (
      <Layout>
		  <Form type="create" onSubmit={handleAddBlog}/>
      </Layout>
  )
}

export default AddBlog