import {createSlice} from '@reduxjs/toolkit'
import STATUSES from '../src/globals/status/statuses'
import API from '../src/http'
import { createSelector } from 'reselect'

const blogSlice = createSlice({
      name : 'blog',
      initialState : {
            blogs : [],
            singleBlog: null,
            status : "idle",
            deleteStatus: null
      },
      reducers: {
           setStatus(state, action) {
           state.status = action.payload
         },
            setBlogs(state, action) {
            state.blogs = action.payload // Ensure this matches your `useSelector`
          },
          setDeleteStatus(state, action){
            state.deleteStatus = action.payload;
          },
          setSingleBlog(state, action) {
            state.singleBlog = action.payload; // Stores single blog separately
          }
      }
})  

export const {setStatus,setBlogs,setDeleteStatus,setSingleBlog} = blogSlice.actions
export default blogSlice.reducer

// Memoized Selector for all blogs
export const selectBlogs = createSelector(
      (state) => state.blog.blogs,
      (blogs) => blogs.slice() // Ensure it returns a stable reference
    );
    
    // Memoized Selector for a single blog
    export const selectSingleBlog = createSelector(
      (state) => state.blog.singleBlog,
      (singleBlog) => singleBlog || {} // Ensure it returns the same empty object if null
    )

// add blog
export function addBlog(data){
      return async function addBlogThunk(dispatch){
       dispatch(setStatus(STATUSES.LOADING))

       const token = localStorage.getItem('jwt');

       if (!token) {
         // Token is not found, handle the error
         dispatch(setStatus(STATUSES.ERROR));
         console.log('No token found. Please login.');
         return; // Exit the function as token is required for the request
       }
         try {
            const response = await API.post('blog', data,{
                  headers : {
                        'Authorization': `${token}`,  
                        "Content-Type" : "multipart/form-data"
                  }
            }) 
            if(response.status === 201){
             dispatch(setStatus(STATUSES.SUCCESS))
            }else{
              console.log("Failed to create blog.");
             dispatch(setStatus(STATUSES.ERROR))
            }
          } catch (error) {
            console.log(error?.response?.data?.message)
            dispatch(setStatus(STATUSES.ERROR))
          }
      }
}

// fetch blog
export function fetchBlog(){
      return async function fetchBlogThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
      try {
            const response = await API.get('blog')
            console.log("Fetched Blogs:", response.data) // Debug: Check API response

      if(response.status === 200 && Array.isArray(response.data.data)){
            dispatch(setBlogs(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
      }else{
            dispatch(setBlogs([]))
            dispatch(setStatus(STATUSES.ERROR))
      }
      } catch (error) {
            console.log("Error fetching blogs:", error?.response?.data?.message)            
            dispatch(setBlogs([])) // Clear state to avoid stale data
            dispatch(setStatus(STATUSES.ERROR))
      }
  }
}

// Delete blog
export function deleteBlog(id){
      return async function deleteBlogThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
      try {
            const response = await API.delete(`blog/${id}`, {
                  headers: { 
                        'Authorization': localStorage.getItem('jwt') 
                  }
                })    
      if(response.status === 200){

            dispatch(setStatus(STATUSES.SUCCESS))
      }else{
            dispatch(setStatus(STATUSES.ERROR))
      }
      } catch (error) {
            console.log(error?.response?.data?.message)
            dispatch(setStatus(STATUSES.ERROR))
      }
  }
}


// edit blog
export function editBlog(id, data) {
      return async function editBlogThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
          const response = await API.patch(`blog/${id}`, data, {
            headers: {
                  "Authorization" : localStorage.getItem('jwt'),
                  "Content-Type" : "multipart/form-data"
            }
          })
    
          if (response.status === 200) {
            dispatch(setStatus(STATUSES.SUCCESS))
          } else {
            dispatch(setStatus(STATUSES.ERROR))
          }
        } catch (error) {
          console.log(error?.response?.data?.message)
          dispatch(setStatus(STATUSES.ERROR))
        }
      }
    }
    
//fetch single blog
export function fetchSingleBlog(id) {
      return async function fetchSingleBlogThunk(dispatch) {
            dispatch(setStatus(STATUSES.LOADING))
        try {
          const response = await API.get(`blog/${id}`)
          console.log("Fetched Single Blog:", response.data) // Debug log

          if (response.status === 200) {
            dispatch(setSingleBlog(response.data.data))//
            dispatch(setStatus(STATUSES.SUCCESS))
          } else {
            dispatch(setStatus(STATUSES.ERROR))
          }
        } catch (error) {
            console.log("Error fetching single blog:", error?.response?.data?.message)
            dispatch(setStatus(STATUSES.ERROR))
        }
      }
}
