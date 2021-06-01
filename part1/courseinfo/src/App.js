import React from 'react'

const Course = ({ course }) => {

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

const Header = ({ course }) => {
  return (
    <h2>{course}</h2>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <h4>total of {sum} exercises</h4>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </div>
    </div>
  )
}

export default Course