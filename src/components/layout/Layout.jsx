import React from 'react'
import Navbar from '../navbar/Navbar'

const Layout = ({children}) => {
  return (
    <>
    <Navbar />
    {children}
    {/* <Footer /> */}
    </>
  )
}

export default Layout