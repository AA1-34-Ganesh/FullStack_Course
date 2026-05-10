import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App = () => {
    const course = 'Half Stack application development';
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of component',
            exercises: 14
        }
    ]
    const total = parts[0].exercises + parts[1].exercises + parts[2].exercises;
    return (
        <div>
            <Header course={course} />
            <Content part1={parts[0].name} exercises1={parts[0].exercises} part2={parts[2].name}
                exercises2={parts[1].exercises} part3={parts[2].name} exercises3={parts[2].exercises} />
            <Total total={total} />
        </div>
    )
}

export default App