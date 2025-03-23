import axios from "axios";
import { useEffect, useState } from "react";


const useFetch = (url) => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const fetchData = async () => {
      try {
            const response = await axios.get(url)
            if(response.status === 200){
                  setData(response.data.data)
            }else{
                  setError(response.data.message)
            }
      } catch (error){
           setError(error) 
      }finally{
            setLoading(false)
      }
      }

      useEffect(() => {
            fetchData();
      },[])

      return { data, loading, error }

}

export default useFetch