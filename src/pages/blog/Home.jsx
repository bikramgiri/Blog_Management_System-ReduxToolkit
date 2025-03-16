import { useEffect, useMemo } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Layout from '../../components/layout/Layout'
import Card from './components/card/Card'
import { fetchBlog } from '../../../store/blogSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  // throw new Error('Error in Home Page')
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog.blogs)  // Correct key
  
  // Memoize blogs to prevent unnecessary re-renders
  const memoizedBlogs = useMemo(() => blogs, [blogs])

  useEffect(() => {
    dispatch(fetchBlog())
  }, [dispatch])

    console.log("Blogs from Redux:", memoizedBlogs)

  return (
      <Layout>
      <div className="flex flex-wrap justify-center space-x-5 mt-6">
      {memoizedBlogs.length > 0 ? (
          memoizedBlogs.map((blog) => (
            <Card key={blog._id} blog={blog} />
          ))
        ) : (
          <p className="text-gray-700 text-lg">No blogs available</p>
        )}
      </div>
      </Layout>
  )
}

export default Home