// import { createSelector } from "reselect";
// import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteBlog, fetchSingleBlog, setStatus,selectSingleBlog } from '../../../store/blogSlice'

const SingleBlog = () => {
    const {id} = useParams()
    // const {data: blogs = {}, status, deleteStatus } = useSelector((store) => store.blogs || {})    
    
        // ✅ Use memoized selector
        const blog = useSelector(selectSingleBlog);
        const status = useSelector((state) => state.blog.status);
        const deleteStatus = useSelector((state) => state.blog.deleteStatus);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // useEffect(() => {
    //     dispatch(fetchSingleBlog(id))
    //   }, [id, dispatch])

    useEffect(() => {
        if (!blog || blog._id !== id) {
            dispatch(fetchSingleBlog(id));
        }
    }, [id, blog, dispatch]);

      const handleDelete = () => {
        dispatch(deleteBlog(id))
      }

      useEffect(() => {
        if (deleteStatus === true) {
          dispatch(setStatus(null))
          navigate("/")
        }
      }, [deleteStatus, dispatch, navigate])

      if (status === "loading") {
        return <div className="text-center text-xl mt-10">Loading...</div>;
    }

    if (!blog) {
        return <div className="text-center text-xl mt-10">Blog not found.</div>;
    }

  return (
    <Layout>
      <div className="bg-gray-100 dark:bg-gray-800 py-8 h-screen ">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-cover" src={blog?.imageUrl} alt={blog?.title} />
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        {/* <Link to={`/blog/edit/${id}`}>
                        <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Edit</button>
                        </Link> */}
                        <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" onClick={()=>navigate(`/blog/edit/${blog._id}`)}>Edit</button>
                    </div>
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{blog?.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {blog?.subtitle}
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Category:</span>
                        <span className="text-gray-600 dark:text-gray-300">{blog?.category}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Author: {blog?.userId?.username }</span>
                    </div>
                </div>

                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        {blog?.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

    </Layout>
  )
}

export default SingleBlog