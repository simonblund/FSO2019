import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    console.log("Header props " + props.course.name)
    return <h1>{props.course.name}</h1>
}

const Part = (part) =>{
    return (
        <p class="cat">{part.part.name} {part.part.exercises}</p>
    )
}
const Content = (parts) =>{
    
    return (
        <div>
            
           <Part part={parts.parts[0]} />
           <Part part={parts.parts[1]} />
           <Part part={parts.parts[2]} />
          
          
        </div>
    )
}
const Total = (parts) =>{
    console.log(parts)
    return <p>Number of exercises { 
        parts.parts[0].exercises+
        parts.parts[0].exercises+
        parts.parts[0].exercises}
        </p>
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts:[
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    
  
    return (
      <div>
          <Header course={course} />
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        
        
        
        
        
        
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))
