import React from "react";

interface HeaderProps {
  name: string;
}

interface TotalProps {
  total: number;
}

interface Desc {
  description?: string;
}

interface CoursePartBase extends Desc {
  name: string;
  exerciseCount: number;
  id: string;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
  name: "Sehroz";
  description: string;
}
type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    id: "a",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    id: "b",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    id: "c",
  },
  {
    name: "Sehroz",
    exerciseCount: 1,
    description: "000",
    id: "d",
  },
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FunctionComponent<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <p>{part.name}</p>
          {part.description && <p>{part.description}</p>}
          <p>Exercises:{part.exerciseCount}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>{part.name}</p>
          <p>Exercises:{part.exerciseCount}</p>
          <p>Group Projects: {part.groupProjectCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>{part.name}</p>
          {part.description && <p>{part.description}</p>}
          <p>Exercises: {part.exerciseCount}</p>
          <p>
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </p>
        </div>
      );
    case "Sehroz":
      return (
        <div>
          <p>{part.name}</p>
          {part.description && <p>{part.description}</p>}
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Header: React.FunctionComponent<HeaderProps> = ({ name }) => {
  return <div>{name}</div>;
};

const Content: React.FunctionComponent<{ courseParts: CoursePart[] }> = ({
  courseParts,
}) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total: React.FunctionComponent<TotalProps> = ({ total }) => {
  return (
    <>
      <span> Number of exercises: {total} </span>
    </>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const total = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={total} />
    </div>
  );
};

export default App;
