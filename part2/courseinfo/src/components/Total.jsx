import React from 'react'

const Total = (props) => {
     const total = props.parts[0].exercises + props.parts[1].exercises +props.parts[2].exercises;
  return (
    <div>
       Number of exercises: {total}
    </div>
  )
}

export default Total