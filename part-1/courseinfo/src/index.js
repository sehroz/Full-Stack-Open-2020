import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = (props) => {
  const { part1, exercises1, part2, exercises2, part3, exercises3 } = props;
  return (
    <>
      <Part part={part1} excercise={exercises1} />
      <Part part={part2} excercise={exercises2} />
      <Part part={part3} excercise={exercises3} />
    </>
  );
};

const Part = (props) => {
  const { part, excercise } = props;
  return (
    <p>
      {part} {excercise}
    </p>
  );
};

const Total = (props) => {
  const { exercises1, exercises2, exercises3 } = props;
  const total = exercises1 + exercises2 + exercises3;
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application develop ment";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
