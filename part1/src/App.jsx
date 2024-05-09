const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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

  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises 
  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.parts[0].name} consta de {course.parts[0].exercises}</p>
      <p>{course.parts[1].name} consta de {course.parts[1].exercises}</p>
      <p>{course.parts[2].name} consta de {course.parts[2].exercises}</p>
      <h2>El total de ejercicios es de: {total}</h2>
    </div>
  )
}
export default App