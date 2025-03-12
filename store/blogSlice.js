import {createSlice} from '@reduxjs/toolkit'
import STATUSES from '../src/globals/status/statuses'
import API from '../src/http'
import { createSelector } from 'reselect'

const blogSlice = createSlice({
      name : 'blog',
      initialState: {
        blogs: [],
        singleBlog: null,
        status: {
          add: STATUSES.IDLE,
          fetch: STATUSES.IDLE,
          delete: STATUSES.IDLE,
          edit: STATUSES.IDLE,
          fetchSingle: STATUSES.IDLE //Already present but needs proper handling
        }
      },
      reducers: {
        setStatus(state, action) {
          const { key, value } = action.payload; // Destructure directly from action.payload
          state.status[key] = value;
        },
            setBlogs(state, action) {
            state.blogs = action.payload // Ensure this matches your `useSelector`
          },
          setSingleBlog(state, action) {
            state.singleBlog = action.payload; // Stores single blog separately
          }
      }
})  

export const {setStatus,setBlogs,setSingleBlog} = blogSlice.actions
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
       dispatch(setStatus({ key: 'add', value: STATUSES.LOADING }))

       const token = localStorage.getItem('jwt');

       if (!token) {
         // Token is not found, handle the error
         dispatch(setStatus({ key: 'add', value: STATUSES.ERROR }));
         console.log('No token found. Please login.');
         return; // Exit the function as token is required for the request
       }
         try {
          const formData = new FormData();
      formData.append('title', data.title);
      formData.append('subtitle', data.subtitle);
      formData.append('category', data.category);
      formData.append('description', data.description);
      formData.append('image', data.image); // Append the image file

    
            const response = await API.post('blog', formData,{
                  headers : {
                        'Authorization': `${token}`,  
                        // "Content-Type" : "multipart/form-data"
                  }
            }) 
            if(response.status === 201){
              console.log("Blog created successfully!")
              dispatch(setStatus({ key: 'add', value: STATUSES.SUCCESS }))
            }else{
              console.log("Failed to create blog.");
              dispatch(setStatus({ key: 'add', value: STATUSES.ERROR }))
            }
          } catch (error) {
            console.log(error?.response?.data?.message)
            dispatch(setStatus({ key: 'add', value: STATUSES.ERROR }))
          }
      }
}

// fetch blog
export function fetchBlog(){
      return async function fetchBlogThunk(dispatch){
        dispatch(setStatus({ key: 'fetch', value: STATUSES.LOADING }));
      try {
            const response = await API.get('blog')
            console.log("Fetched Blogs:", response.data) // Debug: Check API response

      if(response.status === 200){
            dispatch(setBlogs(response.data.data))
            dispatch(setStatus({ key: 'fetch', value: STATUSES.SUCCESS }));
      }else{
            // dispatch(setBlogs([]))
            dispatch(setStatus({ key: 'fetch', value: STATUSES.ERROR }));
      }
      } catch (error) {
            console.log("Error fetching blogs:", error?.response?.data?.message)            
            // dispatch(setBlogs([])) // Clear state to avoid stale data
            dispatch(setStatus({ key: 'fetch', value: STATUSES.ERROR }));
      }
  }
}

// Delete blog
export function deleteBlog(id){
      return async function deleteBlogThunk(dispatch){
        dispatch(setStatus({ key: 'delete', value: STATUSES.LOADING }))
      try {
            const response = await API.delete(`blog/${id}`, {
                  headers: { 
                        'Authorization': localStorage.getItem('jwt') 
                  }
                })    
      if(response.status === 200){
        dispatch(setStatus({ key: 'delete', value: STATUSES.SUCCESS }))
      }else{
        dispatch(setStatus({ key: 'delete', value: STATUSES.ERROR }))
      }
      } catch (error) {
            console.log(error?.response?.data?.message)
            dispatch(setStatus({ key: 'delete', value: STATUSES.ERROR}))
      }
  }
}


// edit blog
export function editBlog(id, data) {
      // return async function editBlogThunk(dispatch) {
        return async (dispatch) => {
        dispatch(setStatus({ key: 'edit', value: STATUSES.LOADING }))
       
        const token = localStorage.getItem('jwt');
       if (!token) {
         // Token is not found, handle the error
         dispatch(setStatus({ key: 'edit', value: STATUSES.ERROR}))
         console.log('No token found. Please login.');
         return // Exit the function as token is required for the request
       }
        
        try {
          const formData = new FormData()
      formData.append('title', data.title)
      formData.append('subtitle', data.subtitle)
      formData.append('category', data.category)
      formData.append('description', data.description)
      
       // Handle image upload properly
       if (data.image instanceof File) {
        formData.append('image', data.image); // For new uploads
      }
      // Don't send anything if keeping existing image


          const response = await API.patch(`blog/${id}`, formData, {
            headers: {
                  'Authorization': `${token}`,
                  "Content-Type" : "multipart/form-data"
            }
          })

          console.log("Edit Response:", response.data); // Debug log
    
          if (response.status === 200) {
            dispatch(setStatus({ key: 'edit', value: STATUSES.SUCCESS }))
            dispatch(fetchSingleBlog(id)) // Refresh single blog data
          } else {
            dispatch(setStatus({ key: 'edit', value: STATUSES.ERROR }))
          }
        } catch (error) {
          console.error("Edit error:", error.response?.data); // Debug log
          dispatch(setStatus({ key: 'edit', value: STATUSES.ERROR }))
        }
      }
    }
    
//fetch singleblog
export function fetchSingleBlog(id) {
      // return async function fetchSingleBlogThunk(dispatch) {
        return async (dispatch) => {
        dispatch(setStatus({ key: 'fetchSingle', value: STATUSES.LOADING }))
        try {
          const response = await API.get(`blog/${id}`)
          console.log("API Response:", response.data); // Debug log

          if (response.status === 200 && response.data?.data) {
            dispatch(setSingleBlog(response.data.data))
            dispatch(setStatus({ key: 'fetchSingle', value: STATUSES.SUCCESS }))
          } else {
            dispatch(setStatus({ key: 'fetchSingle', value: STATUSES.ERROR }))
          }
        } catch (error) {
            console.log("Error fetching single blog:", error?.response?.data?.message)
            dispatch(setStatus({ key: 'fetchSingle', value: STATUSES.ERROR }))
        }
      }
}
