import React from 'react'
import PropTypes from "prop-types"

const Display = ({text,displayValue}) => {
  console.log("I am from Display")
  return (
    <p>From Display component, {text}, {displayValue}</p>
  )
}

Display.propTypes = {
  text: PropTypes.string.isRequired,
  displayValue: PropTypes.number.isRequired
}

export default React.memo(Display)