// import React from 'react'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Form from './components/form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editBlog, setStatus } from '../../../store/blogSlice'
import STATUSES from '../../globals/status/statuses'

const EditBlog = () => {
  const {inputData,status} = useSelector(state => state.blog)
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [blog, setBlog] = useState({
    title: inputData?.title || "",
    subtitle: inputData?.subtitle || "",
    category: inputData?.category || "",
    image: inputData?.image || null,
    description: inputData?.description || ""
  })

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setBlog(prevState => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value
    }))
  }

  const handleEditBlog = () => {
    dispatch(editBlog(blog,id))
  }
  
  useEffect(()=> {
    if(status === STATUSES.SUCCESS  ){
      dispatch(setStatus(null))
      navigate(`blog/${id}`)
    }
  },[status, dispatch, navigate, id])
  
  return (
    <Layout>
      <Form type="edit" onSubmit={handleEditBlog} onChange={handleChange} values={blog}/>
    </Layout>
  )
}

export default EditBlog