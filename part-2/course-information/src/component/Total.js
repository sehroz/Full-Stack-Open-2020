import React from "react";

const Total = ({ course }) => {
  const sum = course.parts.reduce((a, b) => a + b.exercises, 0);

  return <h3>Number of exercises {sum}</h3>;
};

export default Total;
