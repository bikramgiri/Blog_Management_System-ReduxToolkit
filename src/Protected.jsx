import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"

const Protected = ({children}) => {
      const {token} = useSelector((state)=>state.auth) 
      const isAuthenticated = token || localStorage.getItem('jwt')

      if(!isAuthenticated){
            return <Navigate to ='/login' />
      }else{
          return <>
               {children}
            </>
      }
}

Protected.propTypes = {
      children: PropTypes.element.isRequired
}

export default Protected