import React from 'react'

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>  
    )
}

const Header = (props) => {
    return <h1>{props.course.name}</h1>
}

const Content = ({parts}) =>{
    const rows = () => parts.map(part =>
        <Part part={part} key={part.id}/>
      )
    return (
        <div> 
           {rows()}
        </div>
    )
}

const Part = ({part}) =>{
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({parts}) =>{
    const total = parts.reduce((s,p)=>s+p.exercises, 0)
    return <p>Number of exercises {total}</p>
}

export default Course