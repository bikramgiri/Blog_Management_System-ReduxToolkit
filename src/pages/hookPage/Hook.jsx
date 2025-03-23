// import React from 'react'
import useCounter from "../../hooks/useCounter"
import useFetch from "./useFetch"
import useInput from "./useInput"

const Hook = () => {
  const{ count, increment, decrement } = useCounter(0)

  const { value, onChange } = useInput("")
  const {data, loading, error} = useFetch("https://react30.onrender.com/api/user/blog")
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div>
      <p>Count: {count} </p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>

      <input type="text" value={value} onChange={onChange} />
      <ul>{
        data.map(post=>(
          <li key={post._id}>{post.title}</li>
        ))
      }
      </ul>
      <p>{value}</p>
    </div>
  )
}

export default Hook