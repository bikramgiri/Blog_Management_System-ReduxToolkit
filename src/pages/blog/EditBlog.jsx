// import React from 'react'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Form from './components/form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editBlog, fetchSingleBlog, setSingleBlog, setStatus } from '../../../store/blogSlice'
import STATUSES from '../../globals/status/statuses'

const EditBlog = () => {
  const token = localStorage.getItem('jwt')
  const {singleBlog,status} = useSelector(state => state.blog)
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [blog, setBlog] = useState({
    title: "",
    subtitle: "",
    category: "",
    image: null,
    description: ""
  })

  // Add this useEffect to clear previous blog data
  useEffect(() => {
    return () => {
      dispatch(setSingleBlog(null)); // Clear previous blog data on unmount
    };
  }, [dispatch]);
  
   // Fetch blog data when component mounts or ID changes
   useEffect(() => {
    dispatch(fetchSingleBlog(id))
  }, [dispatch, id])

  useEffect(() => {
    if (singleBlog && status.fetchSingle === STATUSES.SUCCESS) {
      setBlog({
        title: singleBlog.title,
        subtitle: singleBlog.subtitle,
        category: singleBlog.category,
        description: singleBlog.description,
        image: singleBlog.imageUrl // Use imageUrl instead of image
      });
    }
  }, [singleBlog, status.fetchSingle])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setBlog(blog => ({
      ...blog,
      [name]: type === "file" ? files[0] : value
    }))
  }

  const handleEditBlog = () => {
    dispatch(editBlog(id, blog)) // Fix parameter order
  }
  
  useEffect(() => {
    if (status.edit === STATUSES.SUCCESS) {
      // Navigate immediately; data is already updated via setSingleBlog
      navigate(`/blog/${id}`);
      dispatch(setStatus({ key: 'edit', value: STATUSES.IDLE }));
    }
  }, [status.edit, navigate, id, dispatch]);
  
  useEffect(() => {
    if (status.edit === STATUSES.ERROR) {
      alert("Failed to update blog. Please try again.");
    }
  }, [status.edit])


  if(!token){
      return <h1>Please login!</h1>
}
  
  return (
    <Layout>
    {status.fetchSingle === STATUSES.SUCCESS && (
        <Form
        type="edit"
        onSubmit={handleEditBlog}
        onChange={handleChange}
        value={blog}
        initialValues={{
    title: singleBlog?.title,
    subtitle: singleBlog?.subtitle,
    category: singleBlog?.category,
    description: singleBlog?.description,
    imageUrl: singleBlog?.imageUrl // CORRECT FIELD NAME
  }}
      />
      )}
  </Layout>    
  )
}

export default EditBlog