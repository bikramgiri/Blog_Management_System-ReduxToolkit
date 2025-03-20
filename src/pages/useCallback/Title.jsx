import React from "react"

const Title = () => {
  console.log("I am from Title")
  return (
    <div>Learning UseCallback</div>
  )
}

export default React.memo(Title)