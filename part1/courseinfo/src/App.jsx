import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App=()=>{
    const course='Half Stack application development';

    const part1={
        name:'Fundamentals of React',
        exercises:10
    }
    const part2={
        name:'Using props to pass data',
        exercises:7
    }
    const part3={
        name:'State of component',
        exercises:14
    }
   
    const total=part1.exercises+part2.exercises+part3.exercises;
    return (
       <div>
          <Header course={course}/>
          <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} 
          exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises}/>
          <Total total={total} />
       </div>
    )
}

export default App