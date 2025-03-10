// import React from 'react'
import Navbar from '../navbar/Navbar'
import PropTypes from 'prop-types'

const Layout = ({children}) => {
  return (
    <>
    <Navbar />
    {children}
    {/* <Footer /> */}
    </>
  )
}

// Add PropTypes validation for the `children` prop
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is required and can be any renderable node
}

export default Layout