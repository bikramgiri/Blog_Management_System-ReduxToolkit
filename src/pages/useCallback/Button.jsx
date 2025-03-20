import React from 'react'
import PropTypes from "prop-types"

const Button = ({content,handleClick}) => {
  console.log("I am from Button " + content)
  return (
    <button onClick={handleClick}>{content}</button>
  )
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default React.memo(Button)