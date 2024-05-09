const Header = (props)=>{
  return(
    <>
    <h1>{props.name}</h1>
    </>
  )
}
const Part = (props)=>{
  return(
    <>
    <p>La parte de {props.part} tiene {props.exercises} ejercicios</p>
    </>
  )
}
const Total = (props)=>{
  return(
    <>
    <p>El total de ejercicios es de {props.total}</p>
    </>
  )
}

const App = ()=> {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const total = exercises1+exercises2+exercises3
  return (
    <>
    <Header name={course}/>
    <Part part={part1} exercises={exercises1}/>
    <Part part={part2} exercises={exercises2}/>
    <Part part={part3} exercises={exercises3}/>
    <Total total={total}/>
    </>
  )
}

export default App
