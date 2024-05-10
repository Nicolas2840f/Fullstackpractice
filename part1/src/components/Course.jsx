import { useState } from "react";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  const exercisesArray = course.parts.map((part) => part.exercises);
  
  let totalExercises = 0;

  exercisesArray.map((exercise) => {
    totalExercises += exercise;
  });
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p>Total of {totalExercises} exercises </p>
    </>
  );
};

export default Course;
